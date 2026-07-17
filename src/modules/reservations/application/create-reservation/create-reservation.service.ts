import { Injectable } from '@nestjs/common';

import { DashboardEventsService } from '../../../dashboard/realtime/dashboard-events.service';

import { CreateReservationUseCase } from './create-reservation.use-case';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Injectable()
export class CreateReservationService {
  constructor(
    private readonly useCase: CreateReservationUseCase,
    private readonly dashboardEventsService: DashboardEventsService,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
    usuarioId: string,
  ): Promise<CreateReservationResponseDto> {
    const reservation =
      await this.useCase.execute(
        request,
        usuarioId,
      );

    this.dashboardEventsService.emit(
      'reservations.updated',
    );

    return reservation;
  }
}