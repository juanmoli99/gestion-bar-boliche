import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoReserva } from '../../../../generated/prisma/enums';

import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { UpdateReservationStatusRepository } from './update-reservation-status.repository';
import { UpdateReservationStatusRequestDto } from './dto/update-reservation-status.request.dto';
import { UpdateReservationStatusResponseDto } from './dto/update-reservation-status.response.dto';

@Injectable()
export class UpdateReservationStatusUseCase {
  constructor(
    private readonly repository: UpdateReservationStatusRepository,
    private readonly historyService: ReservationHistoryService,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationStatusRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationStatusResponseDto> {
    const estadosPermitidos: EstadoReserva[] = [
    EstadoReserva.ASISTIO,
    EstadoReserva.NO_ASISTIO,
    EstadoReserva.FINALIZADA,
    ];

    if (!estadosPermitidos.includes(request.estado)) {
      throw new BadRequestException(
        'El estado solicitado no puede aplicarse desde este endpoint.',
      );
    }

    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    if (reserva.estado === EstadoReserva.CANCELADA) {
      throw new BadRequestException(
        'No puede modificarse una reserva cancelada.',
      );
    }

    if (reserva.estado === request.estado) {
      throw new BadRequestException(
        'La reserva ya tiene ese estado.',
      );
    }

    const estadoAnterior = reserva.estado;

    const reservaActualizada =
      await this.repository.update(
        id,
        request.estado,
        usuarioId,
      );

    await this.historyService.register({
      reservaId: id,
      usuarioId,
      accion: 'ESTADO_RESERVA_ACTUALIZADO',
      campo: 'estado',
      valorAnterior: estadoAnterior,
      valorNuevo: reservaActualizada.estado,
    });

    return reservaActualizada;
  }
}