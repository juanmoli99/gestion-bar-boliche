import { Injectable } from '@nestjs/common';

import { DashboardEventsService } from '../../../dashboard/realtime/dashboard-events.service';

import { ConfirmReservationUseCase } from './confirm-reservation.use-case';
import { ConfirmReservationResponseDto } from './dto/confirm-reservation.response.dto';

@Injectable()
export class ConfirmReservationService {
  constructor(
    private readonly useCase: ConfirmReservationUseCase,
    private readonly dashboardEventsService: DashboardEventsService,
  ) {}

  async execute(
    id: string,
    usuarioId: string,
  ): Promise<ConfirmReservationResponseDto> {
    const reservation =
      await this.useCase.execute(
        id,
        usuarioId,
      );

    this.dashboardEventsService.emit(
      'reservations.updated',
    );

    return reservation;
  }
}