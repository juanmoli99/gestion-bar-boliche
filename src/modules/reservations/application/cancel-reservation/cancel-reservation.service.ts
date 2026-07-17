import { Injectable } from '@nestjs/common';

import { DashboardEventsService } from '../../../dashboard/realtime/dashboard-events.service';

import { CancelReservationUseCase } from './cancel-reservation.use-case';
import { CancelReservationRequestDto } from './dto/cancel-reservation.request.dto';

@Injectable()
export class CancelReservationService {
  constructor(
    private readonly useCase: CancelReservationUseCase,
    private readonly dashboardEventsService: DashboardEventsService,
  ) {}

  async execute(
    id: string,
    request: CancelReservationRequestDto,
  ) {
    const reservation =
      await this.useCase.execute(
        id,
        request,
      );

    this.dashboardEventsService.emit(
      'reservations.updated',
    );

    return reservation;
  }
}