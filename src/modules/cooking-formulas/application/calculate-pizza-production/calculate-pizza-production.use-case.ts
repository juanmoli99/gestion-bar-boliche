import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CalculatePizzaProductionRepository } from './calculate-pizza-production.repository';

import { CalculatePizzaProductionRequestDto } from './dto/calculate-pizza-production.request.dto';

import {
  CalculatePizzaProductionFormulaResponseDto,
  CalculatePizzaProductionIngredientResponseDto,
  CalculatePizzaProductionReservationResponseDto,
  CalculatePizzaProductionResponseDto,
} from './dto/calculate-pizza-production.response.dto';

function createArgentinaDate(
  date: string,
  endOfDay: boolean,
): Date {
  const time = endOfDay
    ? '23:59:59.999'
    : '00:00:00.000';

  return new Date(
    `${date}T${time}-03:00`,
  );
}

interface FormulaAcumulada {
  formulaCocinaId: string;
  formulaCocina: string;
  cantidadPersonasNormales: number;
  pizzasNormalesNecesarias: number;
}

interface IngredienteAcumulado {
  itemId: string;
  nombreItem: string;
  unidadesPorPack: number | null;
  stockDisponible: number;
  cantidadNecesaria: number;
}

@Injectable()
export class CalculatePizzaProductionUseCase {
  constructor(
    private readonly repository:
      CalculatePizzaProductionRepository,
  ) {}

  async execute(
    request: CalculatePizzaProductionRequestDto,
  ): Promise<CalculatePizzaProductionResponseDto> {
    const fechaDesde =
      createArgentinaDate(
        request.fechaDesde,
        false,
      );

    const fechaHasta =
      createArgentinaDate(
        request.fechaHasta,
        true,
      );

    if (fechaDesde > fechaHasta) {
      throw new ConflictException(
        'La fecha inicial no puede ser posterior a la fecha final.',
      );
    }

    const reservas =
      await this.repository.findReservations(
        fechaDesde,
        fechaHasta,
      );

    if (reservas.length === 0) {
      throw new ConflictException(
        'No hay reservas de mesa señadas para realizar el cálculo en el rango seleccionado.',
      );
    }

    const configuracion =
      await this.repository.findProductionConfiguration();

    if (!configuracion) {
      throw new ConflictException(
        'No existe la configuración de producción de pizzas.',
      );
    }

    if (!configuracion.itemPizzaElaborada) {
      throw new ConflictException(
        'No hay un ítem configurado para representar la pizza elaborada.',
      );
    }

    const formulasAcumuladas =
      new Map<string, FormulaAcumulada>();

    const ingredientesAcumulados =
      new Map<string, IngredienteAcumulado>();

    const reservasCalculadas:
      CalculatePizzaProductionReservationResponseDto[] =
      [];

    let cantidadPersonasTotal = 0;
    let cantidadPersonasNormalesTotal = 0;
    let cantidadMenusSinTaccTotal = 0;
    let pizzasNormalesNecesariasSinRedondear = 0;

    for (const reserva of reservas) {
      const cantidadMenusSinTacc =
        reserva.cantidadMenusSinTacc ?? 0;

      if (
        cantidadMenusSinTacc >
        reserva.cantidadPersonas
      ) {
        throw new ConflictException(
          `No se puede realizar el cálculo para la reserva de ${reserva.nombreCliente} del ${this.formatDate(reserva.fechaHora)}: la cantidad de menús sin TACC supera la cantidad de personas.`,
        );
      }

      if (!reserva.formulaCocina) {
        throw new ConflictException(
          `La reserva de ${reserva.nombreCliente} del ${this.formatDate(reserva.fechaHora)} no tiene una fórmula de cocina asignada.`,
        );
      }

      if (!reserva.formulaCocina.activa) {
        throw new ConflictException(
          `La reserva de ${reserva.nombreCliente} del ${this.formatDate(reserva.fechaHora)} tiene una fórmula de cocina desactivada.`,
        );
      }

      const formula =
        reserva.formulaCocina;

      const cantidadPersonasNormales =
        reserva.cantidadPersonas -
        cantidadMenusSinTacc;

      const pizzasNormalesNecesarias =
        cantidadPersonasNormales;

      cantidadPersonasTotal +=
        reserva.cantidadPersonas;

      cantidadPersonasNormalesTotal +=
        cantidadPersonasNormales;

      cantidadMenusSinTaccTotal +=
        cantidadMenusSinTacc;

      pizzasNormalesNecesariasSinRedondear +=
        pizzasNormalesNecesarias;

      reservasCalculadas.push({
        reservaId:
          reserva.id,

        nombreCliente:
          reserva.nombreCliente,

        fechaHora:
          reserva.fechaHora,

        cantidadPersonas:
          reserva.cantidadPersonas,

        cantidadPersonasNormales,

        cantidadMenusSinTacc,

        formulaCocinaId:
          formula.id,

        formulaCocina:
          formula.nombre,

        pizzasNormalesNecesarias:
          this.round(
            pizzasNormalesNecesarias,
          ),
      });

      const formulaExistente =
        formulasAcumuladas.get(
          formula.id,
        );

      if (formulaExistente) {
        formulaExistente
          .cantidadPersonasNormales +=
          cantidadPersonasNormales;

        formulaExistente
          .pizzasNormalesNecesarias +=
          pizzasNormalesNecesarias;
      } else {
        formulasAcumuladas.set(
          formula.id,
          {
            formulaCocinaId:
              formula.id,

            formulaCocina:
              formula.nombre,

            cantidadPersonasNormales,

            pizzasNormalesNecesarias,
          },
        );
      }

      for (
        const formulaItem
        of formula.items
      ) {
        const cantidadNecesaria =
          cantidadPersonasNormales *
          Number(
            formulaItem.cantidadPorPersona,
          );

        this.addIngredient(
          ingredientesAcumulados,
          {
            itemId:
              formulaItem.itemId,

            nombreItem:
              formulaItem.item.nombre,

            unidadesPorPack:
              formulaItem.item.unidadesPorPack,

            stockDisponible:
              this.getStock(
                formulaItem.item.stocks,
              ),

            cantidadNecesaria,
          },
        );
      }
    }

    const pizzasNormalesNecesarias =
      Math.ceil(
        pizzasNormalesNecesariasSinRedondear,
      );

    const stockPizzaElaboradaDisponible =
      this.getStock(
        configuracion
          .itemPizzaElaborada
          .stocks,
      );

    const stockPizzaElaboradaUtilizado =
      Math.min(
        stockPizzaElaboradaDisponible,
        pizzasNormalesNecesariasSinRedondear,
      );

    const pizzasNormalesAProducir =
      Math.ceil(
        Math.max(
          0,
          pizzasNormalesNecesariasSinRedondear -
            stockPizzaElaboradaDisponible,
        ),
      );

    const formulasCalculadas:
      CalculatePizzaProductionFormulaResponseDto[] =
      [];

    for (
      const formula
      of formulasAcumuladas.values()
    ) {
      const proporcion =
        pizzasNormalesNecesariasSinRedondear > 0
          ? (
              formula.pizzasNormalesNecesarias /
              pizzasNormalesNecesariasSinRedondear
            )
          : 0;

      const stockAsignado =
        stockPizzaElaboradaUtilizado *
        proporcion;

      const pizzasFormulaAProducir =
        Math.max(
          0,
          formula.pizzasNormalesNecesarias -
            stockAsignado,
        );

      formulasCalculadas.push({
        formulaCocinaId:
          formula.formulaCocinaId,

        formulaCocina:
          formula.formulaCocina,

        cantidadPersonasNormales:
          formula.cantidadPersonasNormales,

        pizzasNormalesNecesarias:
          Math.ceil(
            formula.pizzasNormalesNecesarias,
          ),

        stockPizzaElaboradaAsignado:
          this.round(
            stockAsignado,
          ),

        pizzasNormalesAProducir:
          Math.ceil(
            pizzasFormulaAProducir,
          ),
      });
    }

    formulasCalculadas.sort(
      (a, b) =>
        a.formulaCocina.localeCompare(
          b.formulaCocina,
        ),
    );

    const ingredientesCalculados:
      CalculatePizzaProductionIngredientResponseDto[] =
      Array.from(
        ingredientesAcumulados.values(),
      )
        .map(
          (ingrediente) =>
            this.calculatePurchase(
              ingrediente,
            ),
        )
        .sort(
          (a, b) =>
            a.nombreItem.localeCompare(
              b.nombreItem,
            ),
        );

    return {
      fechaDesde:
        request.fechaDesde,

      fechaHasta:
        request.fechaHasta,

      cantidadReservas:
        reservas.length,

      cantidadPersonasTotal,

      cantidadPersonasNormalesTotal,

      cantidadMenusSinTaccTotal,

      pizzasNormalesNecesarias,

      stockPizzaElaboradaDisponible:
        this.round(
          stockPizzaElaboradaDisponible,
        ),

      pizzasNormalesAProducir,

      reservas:
        reservasCalculadas,

      formulas:
        formulasCalculadas,

      ingredientes:
        ingredientesCalculados,
    };
  }

  private addIngredient(
    ingredientes:
      Map<string, IngredienteAcumulado>,

    ingrediente:
      IngredienteAcumulado,
  ): void {
    const existente =
      ingredientes.get(
        ingrediente.itemId,
      );

    if (existente) {
      existente.cantidadNecesaria +=
        ingrediente.cantidadNecesaria;

      return;
    }

    ingredientes.set(
      ingrediente.itemId,
      {
        ...ingrediente,
      },
    );
  }

  private calculatePurchase(
    ingrediente: IngredienteAcumulado,
  ): CalculatePizzaProductionIngredientResponseDto {
    const cantidadNecesaria =
      this.round(
        ingrediente.cantidadNecesaria,
      );

    const stockDisponible =
      this.round(
        Math.max(
          0,
          ingrediente.stockDisponible,
        ),
      );

    const faltante =
      Math.max(
        0,
        cantidadNecesaria -
          stockDisponible,
      );

    const unidadesPorPack =
      ingrediente.unidadesPorPack &&
      ingrediente.unidadesPorPack > 0
        ? ingrediente.unidadesPorPack
        : null;

    if (unidadesPorPack) {
      const cantidadPacks =
        Math.ceil(
          faltante /
          unidadesPorPack,
        );

      return {
        itemId:
          ingrediente.itemId,

        nombreItem:
          ingrediente.nombreItem,

        cantidadNecesaria,

        stockDisponible,

        cantidadAComprar:
          cantidadPacks *
          unidadesPorPack,

        unidadesPorPack,

        cantidadPacks,
      };
    }

    return {
      itemId:
        ingrediente.itemId,

      nombreItem:
        ingrediente.nombreItem,

      cantidadNecesaria,

      stockDisponible,

      cantidadAComprar:
        this.round(
          faltante,
        ),

      unidadesPorPack:
        null,

      cantidadPacks:
        null,
    };
  }

  private getStock(
    stocks: {
      cantidadActual: unknown;
    }[],
  ): number {
    return stocks.reduce(
      (
        total,
        stock,
      ) =>
        total +
        Number(
          stock.cantidadActual,
        ),
      0,
    );
  }

  private formatDate(
    date: Date,
  ): string {
    return date.toLocaleString(
      'es-AR',
      {
        timeZone:
          'America/Argentina/Buenos_Aires',
      },
    );
  }

  private round(
    value: number,
  ): number {
    return Number(
      value.toFixed(3),
    );
  }
}