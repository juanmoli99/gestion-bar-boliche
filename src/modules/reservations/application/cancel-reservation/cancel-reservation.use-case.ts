import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoReserva,
} from '../../../../generated/prisma/enums';

import { CancelReservationRepository } from './cancel-reservation.repository';
import { CancelReservationRequestDto } from './dto/cancel-reservation.request.dto';
import { CancelReservationResponseDto } from './dto/cancel-reservation.response.dto';

@Injectable()
export class CancelReservationUseCase {
  constructor(
    private readonly repository: CancelReservationRepository,
  ) {}

  async execute(
    id: string,
    request: CancelReservationRequestDto,
  ): Promise<CancelReservationResponseDto> {

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
        'La reserva ya está cancelada.',
      );
    }

    return this.repository.cancel(
      id,
      request.motivoCancelacion.trim(),
    );
  }
}