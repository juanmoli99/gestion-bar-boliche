import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoReserva,
} from '../../../../generated/prisma/enums';

import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { ConfirmReservationRepository } from './confirm-reservation.repository';
import { ConfirmReservationResponseDto } from './dto/confirm-reservation.response.dto';

@Injectable()
export class ConfirmReservationUseCase {
  constructor(
    private readonly repository: ConfirmReservationRepository,
    private readonly historyService: ReservationHistoryService,
  ) {}

  async execute(
    id: string,
    usuarioId: string,
  ): Promise<ConfirmReservationResponseDto> {
    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    if (
      reserva.estado === EstadoReserva.CANCELADA
    ) {
      throw new BadRequestException(
        'No puede confirmarse una reserva cancelada.',
      );
    }

    if (
      reserva.estado === EstadoReserva.CONFIRMADA
    ) {
      throw new BadRequestException(
        'La reserva ya está confirmada.',
      );
    }

    const estadoAnterior = reserva.estado;

    const reservaConfirmada =
      await this.repository.confirm(
        id,
        usuarioId,
      );

    await this.historyService.register({
      reservaId: id,
      usuarioId,
      accion: 'RESERVA_CONFIRMADA',
      campo: 'estado',
      valorAnterior: estadoAnterior,
      valorNuevo: reservaConfirmada.estado,
    });

    return reservaConfirmada;
  }
}