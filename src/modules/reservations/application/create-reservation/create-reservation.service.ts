import { Injectable } from '@nestjs/common';

import { CreateReservationUseCase } from './create-reservation.use-case';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Injectable()
export class CreateReservationService {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
  ): Promise<CreateReservationResponseDto> {
    return this.createReservationUseCase.execute(
      request,
    );
  }
}