import { Injectable } from '@nestjs/common';

import { UpdateReservationUseCase } from './update-reservation.use-case';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';

@Injectable()
export class UpdateReservationService {
  constructor(
    private readonly useCase: UpdateReservationUseCase,
  ) {}

  execute(
    id: string,
    request: UpdateReservationRequestDto,
  ) {
    return this.useCase.execute(
      id,
      request,
    );
  }
}