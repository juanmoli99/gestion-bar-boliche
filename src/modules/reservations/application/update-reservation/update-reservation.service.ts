import { Injectable } from '@nestjs/common';

import { DashboardEventsService } from '../../../dashboard/realtime/dashboard-events.service';

import { UpdateReservationUseCase } from './update-reservation.use-case';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';
import { UpdateReservationResponseDto } from './dto/update-reservation.response.dto';

@Injectable()
export class UpdateReservationService {
  constructor(
    private readonly useCase: UpdateReservationUseCase,
    private readonly dashboardEventsService: DashboardEventsService,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationResponseDto> {
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