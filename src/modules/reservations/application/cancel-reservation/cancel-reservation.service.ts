import { Injectable } from '@nestjs/common';

import { CancelReservationUseCase } from './cancel-reservation.use-case';
import { CancelReservationRequestDto } from './dto/cancel-reservation.request.dto';

@Injectable()
export class CancelReservationService {
  constructor(
    private readonly useCase: CancelReservationUseCase,
  ) {}

  execute(
    id: string,
    request: CancelReservationRequestDto,
  ) {
    return this.useCase.execute(
      id,
      request,
    );
  }
}