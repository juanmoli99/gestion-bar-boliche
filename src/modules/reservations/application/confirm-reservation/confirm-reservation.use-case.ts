import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoReserva,
} from '../../../../generated/prisma/enums';

import { ConfirmReservationRepository } from './confirm-reservation.repository';
import { ConfirmReservationResponseDto } from './dto/confirm-reservation.response.dto';

@Injectable()
export class ConfirmReservationUseCase {
  constructor(
    private readonly repository: ConfirmReservationRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<ConfirmReservationResponseDto> {

    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    if (
      reserva.estado ===
      EstadoReserva.CANCELADA
    ) {
      throw new BadRequestException(
        'No puede confirmarse una reserva cancelada.',
      );
    }

    if (
      reserva.estado ===
      EstadoReserva.CONFIRMADA
    ) {
      throw new BadRequestException(
        'La reserva ya está confirmada.',
      );
    }

    return this.repository.confirm(id);
  }
}