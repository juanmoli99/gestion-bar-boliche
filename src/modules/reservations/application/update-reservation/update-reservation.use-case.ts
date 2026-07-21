import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type {
  Prisma,
} from '../../../../generated/prisma/client';

import {
  Decimal,
} from '../../../../generated/prisma/internal/prismaNamespace';

import {
  ModalidadFiesta,
  TipoReserva,
} from '../../../../generated/prisma/enums';

import {
  ReservationHistoryComparer,
} from '../reservation-history/helpers/reservation-history-comparer';

import {
  ReservationHistoryService,
} from '../reservation-history/reservation-history.service';

import {
  UpdateReservationRepository,
} from './update-reservation.repository';

import {
  UpdateReservationRequestDto,
} from './dto/update-reservation.request.dto';

import {
  UpdateReservationResponseDto,
} from './dto/update-reservation.response.dto';

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    private readonly repository:
      UpdateReservationRepository,

    private readonly historyService:
      ReservationHistoryService,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationResponseDto> {
    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    const data: Prisma.ReservaUpdateInput = {
      usuarioActualizador: {
        connect: {
          id: usuarioId,
        },
      },
    };

    if (
      request.nombreCliente !== undefined
    ) {
      data.nombreCliente =
        request.nombreCliente.trim();
    }

    if (
      request.telefonoCliente !== undefined
    ) {
      data.telefonoCliente =
        request.telefonoCliente.trim();
    }

    if (
      request.fechaHora !== undefined
    ) {
      data.fechaHora =
        new Date(request.fechaHora);
    }

    if (
      request.cantidadPersonas !== undefined
    ) {
      data.cantidadPersonas =
        request.cantidadPersonas;
    }

    if (
      request.observaciones !== undefined
    ) {
      data.observaciones =
        request.observaciones.trim();
    }

    if (
      reserva.tipo === TipoReserva.MESA &&
      request.cantidadMenusSinTacc !== undefined
    ) {
      data.cantidadMenusSinTacc =
        request.cantidadMenusSinTacc;
    }

    if (
      reserva.tipo === TipoReserva.FIESTA
    ) {
      if (
        request.tipoFiesta !== undefined
      ) {
        data.tipoFiesta =
          request.tipoFiesta.trim();
      }

      if (
        request.modalidadFiesta !== undefined
      ) {
        data.modalidadFiesta =
          request.modalidadFiesta;
      }

      if (
        request.formulaId !== undefined
      ) {
        const version =
          await this.repository
            .findActiveFormulaVersion(
              request.formulaId,
            );

        if (!version) {
          throw new BadRequestException(
            'La fórmula no tiene una versión activa.',
          );
        }

        data.formula = {
          connect: {
            id: request.formulaId,
          },
        };

        data.formulaVersion = {
          connect: {
            id: version.id,
          },
        };
      }
    }

    const cantidadPersonas =
      request.cantidadPersonas ??
      reserva.cantidadPersonas;

    const cantidadMenusSinTacc =
      reserva.tipo === TipoReserva.MESA
        ? request.cantidadMenusSinTacc ??
          reserva.cantidadMenusSinTacc ??
          0
        : 0;

    if (
      cantidadMenusSinTacc >
      cantidadPersonas
    ) {
      throw new BadRequestException(
        'La cantidad de menús sin TACC no puede ser mayor a la cantidad total de personas.',
      );
    }

    const montoSena =
      request.montoSena !== undefined
        ? new Decimal(
            request.montoSena,
          )
        : reserva.montoSena;

    if (
      request.montoSena !== undefined
    ) {
      data.montoSena =
        montoSena;
    }

    let precioTotal: Decimal;

    if (
      reserva.tipo === TipoReserva.MESA
    ) {
      if (
        reserva.valorPizzaLibreAplicado ===
          null ||
        reserva.valorMenuSinTaccAplicado ===
          null
      ) {
        throw new BadRequestException(
          'La reserva no posee los valores aplicados necesarios para recalcular el precio.',
        );
      }

      const cantidadPersonasComunes =
        cantidadPersonas -
        cantidadMenusSinTacc;

      precioTotal =
        reserva.valorPizzaLibreAplicado
          .mul(
            cantidadPersonasComunes,
          )
          .plus(
            reserva.valorMenuSinTaccAplicado.mul(
              cantidadMenusSinTacc,
            ),
          );

      if (
        montoSena !== null &&
        montoSena.greaterThan(
          precioTotal,
        )
      ) {
        throw new BadRequestException(
          'La seña no puede ser mayor al precio total.',
        );
      }

      data.precioTotal =
        precioTotal;

      data.saldoPendiente =
        precioTotal.minus(
          montoSena ??
            new Decimal(0),
        );
    } else {
      const modalidadFinal =
        request.modalidadFiesta ??
        reserva.modalidadFiesta;

      if (!modalidadFinal) {
        throw new BadRequestException(
          'Debe seleccionar la modalidad de la fiesta.',
        );
      }

      const cambiaTarifaBarraLibre =
        request.tarifaBarraLibreId !==
          undefined ||
        (modalidadFinal ===
          ModalidadFiesta.BARRA_LIBRE &&
          reserva.modalidadFiesta !==
            ModalidadFiesta.BARRA_LIBRE);

      if (
        modalidadFinal ===
        ModalidadFiesta.COCTELERIA
      ) {
        precioTotal =
          new Decimal(0);

        data.precioTotal =
          precioTotal;

        data.saldoPendiente =
          new Decimal(0);

        if (
          reserva.modalidadFiesta !==
          ModalidadFiesta.COCTELERIA
        ) {
          data.valorBarraLibreAplicado =
            null;
        }
      } else {
        let valorBarraLibre:
          | Decimal
          | null;

        if (cambiaTarifaBarraLibre) {
  const tarifaId =
    request.tarifaBarraLibreId ??
    reserva.tarifaBarraLibreId;

  if (!tarifaId) {
    throw new BadRequestException(
      'Debe seleccionar una tarifa de barra libre.',
    );
  }

  const tarifa =
    await this.repository.findFreeBarRate(
      tarifaId,
    );

  if (!tarifa) {
    throw new BadRequestException(
      'La tarifa de barra libre seleccionada no existe.',
    );
  }

  valorBarraLibre =
    tarifa.valorPersona;

  data.tarifaBarraLibre = {
    connect: {
      id: tarifa.id,
    },
  };

  data.valorBarraLibreAplicado =
    valorBarraLibre;
} else {
  valorBarraLibre =
    reserva.valorBarraLibreAplicado;
}

        if (
          valorBarraLibre === null
        ) {
          throw new BadRequestException(
            'La reserva no posee el valor de barra libre necesario para recalcular el precio.',
          );
        }

        precioTotal =
          valorBarraLibre.mul(
            cantidadPersonas,
          );

        if (
          montoSena !== null &&
          montoSena.greaterThan(
            precioTotal,
          )
        ) {
          throw new BadRequestException(
            'La seña no puede ser mayor al precio total.',
          );
        }

        data.precioTotal =
          precioTotal;

        data.saldoPendiente =
          precioTotal.minus(
            montoSena ??
              new Decimal(0),
          );
      }
    }

    const updatedReservation =
      await this.repository.update(
        id,
        data,
      );

      const ignoredFields =
        new Set([
          'usuarioActualizador',
          'formula',
          'formulaVersion',
          'tarifaBarraLibre',
        ]);

    const camposModificados =
      Object.keys(data).filter(
        (campo) =>
          !ignoredFields.has(
            campo,
          ),
      );

    const valoresAnteriores: Record<
      string,
      unknown
    > = {};

    const valoresNuevos: Record<
      string,
      unknown
    > = {};

    for (
      const campo of camposModificados
    ) {
      valoresAnteriores[campo] =
        reserva[
          campo as keyof typeof reserva
        ];

      valoresNuevos[campo] =
        updatedReservation[
          campo as keyof typeof updatedReservation
        ];
    }

    if (
      request.formulaId !== undefined
    ) {
      valoresAnteriores.formulaId =
        reserva.formulaId;

      valoresNuevos.formulaId =
        updatedReservation.formulaId;

      valoresAnteriores.formulaVersionId =
        reserva.formulaVersionId;

      valoresNuevos.formulaVersionId =
        updatedReservation.formulaVersionId;
    }

    const cambios =
      ReservationHistoryComparer.compare(
        valoresAnteriores,
        valoresNuevos,
      );

    for (const cambio of cambios) {
      await this.historyService.register({
        reservaId:
          id,

        usuarioId,

        accion:
          'RESERVA_ACTUALIZADA',

        campo:
          cambio.campo,

        valorAnterior:
          cambio.valorAnterior,

        valorNuevo:
          cambio.valorNuevo,
      });
    }

    return updatedReservation;
  }
}