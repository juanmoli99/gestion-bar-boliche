import { Injectable } from '@nestjs/common';

import { DashboardEventsService } from '../../../dashboard/realtime/dashboard-events.service';

import { UpdateReservationStatusUseCase } from './update-reservation-status.use-case';
import { UpdateReservationStatusRequestDto } from './dto/update-reservation-status.request.dto';
import { UpdateReservationStatusResponseDto } from './dto/update-reservation-status.response.dto';

@Injectable()
export class UpdateReservationStatusService {
  constructor(
    private readonly useCase: UpdateReservationStatusUseCase,
    private readonly dashboardEventsService: DashboardEventsService,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationStatusRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationStatusResponseDto> {
    const reservation =
      await this.useCase.execute(
        id,
        request,
        usuarioId,
      );

    this.dashboardEventsService.emit(
      'reservations.updated',
    );

    return reservation;
  }
}