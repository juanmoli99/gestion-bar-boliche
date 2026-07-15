import { Injectable } from '@nestjs/common';

import { CreateReservationUseCase } from './create-reservation.use-case';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Injectable()
export class CreateReservationService {
  constructor(
    private readonly useCase: CreateReservationUseCase,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
    usuarioId: string,
  ): Promise<CreateReservationResponseDto> {
    return this.useCase.execute(
      request,
      usuarioId,
    );
  }
}