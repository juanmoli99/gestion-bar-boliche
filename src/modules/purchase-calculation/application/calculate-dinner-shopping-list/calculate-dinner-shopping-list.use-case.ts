import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  TipoInventario,
} from '../../../../generated/prisma/enums';

import {
  CalculateDinnerShoppingListRepository,
} from './calculate-dinner-shopping-list.repository';

import {
  CalculateDinnerShoppingListRequestDto,
} from './dto/calculate-dinner-shopping-list.request.dto';

import {
  CalculateDinnerShoppingListResponseDto,
  DinnerShoppingListItemResponseDto,
} from './dto/calculate-dinner-shopping-list.response.dto';

interface AccumulatedItem {
  itemId: string;
  nombreItem: string;
  cantidadNecesaria: number;
}

interface AccumulatedDate {
  fecha: string;
  cantidadCenas: number;
  cantidadPersonas: number;
  items: Map<string, AccumulatedItem>;
}

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

function getArgentinaDateString(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone:
        'America/Argentina/Buenos_Aires',

      year:
        'numeric',

      month:
        '2-digit',

      day:
        '2-digit',
    },
  ).format(date);
}

@Injectable()
export class CalculateDinnerShoppingListUseCase {
  constructor(
    private readonly repository:
      CalculateDinnerShoppingListRepository,
  ) {}

  async execute(
    request:
      CalculateDinnerShoppingListRequestDto,
  ): Promise<CalculateDinnerShoppingListResponseDto> {
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
      throw new BadRequestException(
        'La fecha desde no puede ser posterior a la fecha hasta.',
      );
    }

    const reservas =
      await this.repository
        .findDinnerReservations(
          fechaDesde,
          fechaHasta,
        );

    const totalesPorItem =
      new Map<
        string,
        AccumulatedItem
      >();

    const desglosePorFecha =
      new Map<
        string,
        AccumulatedDate
      >();

    let cantidadPersonas = 0;

    for (const reserva of reservas) {
      cantidadPersonas +=
        reserva.cantidadPersonas;

      const fecha =
        getArgentinaDateString(
          reserva.fechaHora,
        );

      let fechaAcumulada =
        desglosePorFecha.get(
          fecha,
        );

      if (!fechaAcumulada) {
        fechaAcumulada = {
          fecha,
          cantidadCenas: 0,
          cantidadPersonas: 0,
          items:
            new Map<
              string,
              AccumulatedItem
            >(),
        };

        desglosePorFecha.set(
          fecha,
          fechaAcumulada,
        );
      }

      fechaAcumulada.cantidadCenas +=
        1;

      fechaAcumulada.cantidadPersonas +=
        reserva.cantidadPersonas;

      const formulaItems =
        reserva.formulaCocina
          ?.items ?? [];

      for (
        const formulaItem
        of formulaItems
      ) {
        if (
          !formulaItem.item.activo
        ) {
          continue;
        }

        const cantidadNecesaria =
          Number(
            formulaItem
              .cantidadPorPersona,
          ) *
          reserva.cantidadPersonas;

        const totalItem =
          totalesPorItem.get(
            formulaItem.itemId,
          );

        if (totalItem) {
          totalItem
            .cantidadNecesaria +=
            cantidadNecesaria;
        } else {
          totalesPorItem.set(
            formulaItem.itemId,
            {
              itemId:
                formulaItem.itemId,

              nombreItem:
                formulaItem
                  .item.nombre,

              cantidadNecesaria,
            },
          );
        }

        const itemFecha =
          fechaAcumulada.items.get(
            formulaItem.itemId,
          );

        if (itemFecha) {
          itemFecha
            .cantidadNecesaria +=
            cantidadNecesaria;
        } else {
          fechaAcumulada.items.set(
            formulaItem.itemId,
            {
              itemId:
                formulaItem.itemId,

              nombreItem:
                formulaItem
                  .item.nombre,

              cantidadNecesaria,
            },
          );
        }
      }
    }

    const itemIds =
      Array.from(
        totalesPorItem.keys(),
      );

    const items =
      itemIds.length > 0
        ? await this.repository
            .findItemsWithKitchenStock(
              itemIds,
            )
        : [];

    const itemMap =
      new Map(
        items.map(
          (item) => [
            item.id,
            item,
          ],
        ),
      );

    const listaCompra:
      DinnerShoppingListItemResponseDto[] =
      Array.from(
        totalesPorItem.values(),
      )
        .map(
          (
            totalItem,
          ): DinnerShoppingListItemResponseDto => {
            const item =
              itemMap.get(
                totalItem.itemId,
              );

            const cantidadNecesaria =
              this.round(
                totalItem
                  .cantidadNecesaria,
              );

            if (!item) {
              return {
                itemId:
                  totalItem.itemId,

                nombreItem:
                  totalItem.nombreItem,

                proveedorId:
                  null,

                inventario:
                  TipoInventario.COCINA,

                precioUnitario:
                  0,

                unidadMedida:
                  'Sin unidad',

                abreviaturaUnidad:
                  '',

                unidadesPorPack:
                  null,

                cantidadNecesaria,

                stockDisponible:
                  0,

                cantidadComprar:
                  cantidadNecesaria,

                packsComprar:
                  null,
              };
            }

            const stockDisponible =
              item.stocks.length > 0
                ? Number(
                    item.stocks[0]
                      .cantidadActual,
                  )
                : 0;

            const faltante =
              Math.max(
                0,
                cantidadNecesaria -
                  stockDisponible,
              );

            const cantidadComprar =
              item.unidadMedida
                .permiteDecimal
                ? this.round(
                    faltante,
                  )
                : Math.ceil(
                    faltante,
                  );

            const packsComprar =
              item.unidadesPorPack &&
              cantidadComprar > 0
                ? Math.ceil(
                    cantidadComprar /
                      item
                        .unidadesPorPack,
                  )
                : null;

            return {
              itemId:
                item.id,

              nombreItem:
                item.nombre,

              proveedorId:
                item.proveedorId,

              inventario:
                TipoInventario.COCINA,

              precioUnitario:
                Number(
                  item.ultimoCosto,
                ),

              unidadMedida:
                item.unidadMedida
                  .nombre,

              abreviaturaUnidad:
                item.unidadMedida
                  .abreviatura,

              unidadesPorPack:
                item.unidadesPorPack,

              cantidadNecesaria,

              stockDisponible:
                this.round(
                  stockDisponible,
                ),

              cantidadComprar,

              packsComprar,
            };
          },
        )
        .sort(
          (a, b) =>
            a.nombreItem
              .localeCompare(
                b.nombreItem,
              ),
        );

    const desglose =
      Array.from(
        desglosePorFecha.values(),
      )
        .sort(
          (a, b) =>
            a.fecha.localeCompare(
              b.fecha,
            ),
        )
        .map(
          (fecha) => ({
            fecha:
              fecha.fecha,

            cantidadCenas:
              fecha.cantidadCenas,

            cantidadPersonas:
              fecha.cantidadPersonas,

            items:
              Array.from(
                fecha.items.values(),
              )
                .map(
                  (item) => ({
                    itemId:
                      item.itemId,

                    nombreItem:
                      item.nombreItem,

                    cantidadNecesaria:
                      this.round(
                        item
                          .cantidadNecesaria,
                      ),
                  }),
                )
                .sort(
                  (a, b) =>
                    a.nombreItem
                      .localeCompare(
                        b.nombreItem,
                      ),
                ),
          }),
        );

    return {
      fechaDesde:
        request.fechaDesde,

      fechaHasta:
        request.fechaHasta,

      cantidadCenas:
        reservas.length,

      cantidadPersonas,

      itemsComprar:
        listaCompra.filter(
          (item) =>
            item.cantidadComprar >
            0,
        ).length,

      listaCompra,

      desglosePorFecha:
        desglose,
    };
  }

  private round(
    value: number,
  ): number {
    return Number(
      value.toFixed(3),
    );
  }
}