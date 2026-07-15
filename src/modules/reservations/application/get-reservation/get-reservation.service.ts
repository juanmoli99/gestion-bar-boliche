import { Injectable } from '@nestjs/common';

import { GetReservationUseCase } from './get-reservation.use-case';
import { GetReservationResponseDto } from './dto/get-reservation.response.dto';

@Injectable()
export class GetReservationService {
  constructor(
    private readonly useCase: GetReservationUseCase,
  ) {}

  execute(
    id: string,
  ): Promise<GetReservationResponseDto> {
    return this.useCase.execute(id);
  }
}