import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  Decimal,
} from '../../../../generated/prisma/internal/prismaNamespace';

import {
  ModalidadFiesta,
  TipoReserva,
} from '../../../../generated/prisma/enums';

import {
  ReservationHistoryService,
} from '../reservation-history/reservation-history.service';

import {
  CreateReservationRepository,
} from './create-reservation.repository';

import {
  CreateReservationRequestDto,
} from './dto/create-reservation.request.dto';

import {
  CreateReservationResponseDto,
} from './dto/create-reservation.response.dto';

function getPizzaValueForDate(
  fechaHora: Date,
  values: {
    pizzaLibreGeneral: Decimal;
    pizzaLibreViernes: Decimal;
    pizzaLibreSabado: Decimal;
  },
): Decimal {
  const weekday =
    new Intl.DateTimeFormat(
      'en-US',
      {
        timeZone:
          'America/Argentina/Buenos_Aires',
        weekday: 'short',
      },
    ).format(fechaHora);

  if (weekday === 'Fri') {
    return values.pizzaLibreViernes;
  }

  if (weekday === 'Sat') {
    return values.pizzaLibreSabado;
  }

  return values.pizzaLibreGeneral;
}

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly repository:
      CreateReservationRepository,

    private readonly historyService:
      ReservationHistoryService,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
    usuarioId: string,
  ): Promise<CreateReservationResponseDto> {
    const fechaHora =
      new Date(request.fechaHora);

    const cantidadMenusSinTacc =
      request.tipo === TipoReserva.MESA
        ? request.cantidadMenusSinTacc ?? 0
        : 0;

    if (
      cantidadMenusSinTacc >
      request.cantidadPersonas
    ) {
      throw new BadRequestException(
        'La cantidad de menús sin TACC no puede ser mayor a la cantidad total de personas.',
      );
    }

    const values =
      await this.repository.findValues();

    if (!values) {
      throw new BadRequestException(
        'Debe configurar los valores antes de crear una reserva.',
      );
    }

    let formulaId: string | undefined;
    let formulaVersionId: string | undefined;

    let modalidadFiesta:
      | ModalidadFiesta
      | undefined;

    if (
      request.tipo === TipoReserva.FIESTA
    ) {
      if (!request.formulaId) {
        throw new BadRequestException(
          'Debe seleccionar una fórmula.',
        );
      }

      if (!request.modalidadFiesta) {
        throw new BadRequestException(
          'Debe seleccionar la modalidad de la fiesta.',
        );
      }

      const version =
        await this.repository.findFormulaVersion(
          request.formulaId,
        );

      if (!version) {
        throw new BadRequestException(
          'La fórmula no posee una versión activa.',
        );
      }

      formulaId =
        request.formulaId;

      formulaVersionId =
        version.id;

      modalidadFiesta =
        request.modalidadFiesta;
    }

    let precioTotal: Decimal;

    let valorPizzaLibreAplicado:
      | Decimal
      | undefined;

    let valorMenuSinTaccAplicado:
      | Decimal
      | undefined;

    let valorBarraLibreAplicado:
      | Decimal
      | undefined;

    if (
      request.tipo === TipoReserva.MESA
    ) {
      const cantidadPersonasComunes =
        request.cantidadPersonas -
        cantidadMenusSinTacc;

      valorPizzaLibreAplicado =
        getPizzaValueForDate(
          fechaHora,
          values,
        );

      valorMenuSinTaccAplicado =
        values.menuSinTacc;

      const totalPersonasComunes =
        valorPizzaLibreAplicado.mul(
          cantidadPersonasComunes,
        );

      const totalMenusSinTacc =
        valorMenuSinTaccAplicado.mul(
          cantidadMenusSinTacc,
        );

      precioTotal =
        totalPersonasComunes.plus(
          totalMenusSinTacc,
        );
    } else if (
      modalidadFiesta ===
      ModalidadFiesta.BARRA_LIBRE
    ) {
      valorBarraLibreAplicado =
        values.fiestaBarraLibrePorPersona;

      precioTotal =
        valorBarraLibreAplicado.mul(
          request.cantidadPersonas,
        );
    } else {
      precioTotal =
        new Decimal(0);
    }

    const montoSena =
      request.montoSena === undefined
        ? undefined
        : new Decimal(
            request.montoSena,
          );

    if (
      montoSena !== undefined &&
      montoSena.greaterThan(
        precioTotal,
      )
    ) {
      throw new BadRequestException(
        'La seña no puede ser mayor al precio total calculado.',
      );
    }

    const saldoPendiente =
      precioTotal.minus(
        montoSena ??
          new Decimal(0),
      );

    const reservation =
      await this.repository.create({
        tipo:
          request.tipo,

        nombreCliente:
          request.nombreCliente.trim(),

        telefonoCliente:
          request.telefonoCliente?.trim(),

        fechaHora,

        cantidadPersonas:
          request.cantidadPersonas,

        cantidadMenusSinTacc:
          request.tipo === TipoReserva.MESA
            ? cantidadMenusSinTacc
            : undefined,

        tipoFiesta:
          request.tipo === TipoReserva.FIESTA
            ? request.tipoFiesta?.trim()
            : undefined,

        modalidadFiesta,

        observaciones:
          request.observaciones?.trim(),

        formulaId,
        formulaVersionId,

        precioTotal,
        montoSena,
        saldoPendiente,

        valorPizzaLibreAplicado,
        valorMenuSinTaccAplicado,
        valorBarraLibreAplicado,

        usuarioCreadorId:
          usuarioId,

        usuarioActualizadorId:
          usuarioId,
      });

    await this.historyService.register({
      reservaId:
        reservation.id,

      usuarioId,

      accion:
        'RESERVA_CREADA',

      campo:
        'estado',

      valorAnterior:
        null,

      valorNuevo:
        reservation.estado,
    });

    return reservation;
  }
}