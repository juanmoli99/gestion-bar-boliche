import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  Decimal,
} from '../../../../generated/prisma/internal/prismaNamespace';

import {
  TipoReserva,
} from '../../../../generated/prisma/enums';

import { ReservationHistoryService } from '../reservation-history/reservation-history.service';

import { CreateReservationRepository } from './create-reservation.repository';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly repository: CreateReservationRepository,
    private readonly historyService: ReservationHistoryService,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
    usuarioId: string,
  ): Promise<CreateReservationResponseDto> {
    let formulaId: string | undefined;
    let formulaVersionId: string | undefined;

    if (request.tipo === TipoReserva.FIESTA) {
      if (!request.formulaId) {
        throw new BadRequestException(
          'Debe seleccionar una fórmula.',
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

      formulaId = request.formulaId;
      formulaVersionId = version.id;
    }

    const precioTotal =
      request.precioTotal === undefined
        ? undefined
        : new Decimal(request.precioTotal);

    const montoSena =
      request.montoSena === undefined
        ? undefined
        : new Decimal(request.montoSena);

    if (
      montoSena !== undefined &&
      precioTotal === undefined
    ) {
      throw new BadRequestException(
        'Debe indicar el precio total para registrar una seña.',
      );
    }

    if (
      precioTotal !== undefined &&
      montoSena !== undefined &&
      montoSena.greaterThan(precioTotal)
    ) {
      throw new BadRequestException(
        'La seña no puede ser mayor al precio total.',
      );
    }

    const saldoPendiente =
      precioTotal === undefined
        ? undefined
        : precioTotal.minus(
            montoSena ?? new Decimal(0),
          );

    const reservation =
      await this.repository.create({
        tipo: request.tipo,
        nombreCliente:
          request.nombreCliente.trim(),
        telefonoCliente:
          request.telefonoCliente?.trim(),
        fechaHora: new Date(request.fechaHora),
        cantidadPersonas:
          request.cantidadPersonas,
        cantidadMenusSinTacc:
          request.tipo === TipoReserva.MESA
            ? request.cantidadMenusSinTacc
            : undefined,
        tipoFiesta:
          request.tipo === TipoReserva.FIESTA
            ? request.tipoFiesta?.trim()
            : undefined,
        observaciones:
          request.observaciones?.trim(),
        formulaId,
        formulaVersionId,
        precioTotal,
        montoSena,
        saldoPendiente,
        usuarioCreadorId: usuarioId,
        usuarioActualizadorId: usuarioId,
      });

    await this.historyService.register({
      reservaId: reservation.id,
      usuarioId,
      accion: 'RESERVA_CREADA',
      campo: 'estado',
      valorAnterior: null,
      valorNuevo: reservation.estado,
    });

    return reservation;
  }
}