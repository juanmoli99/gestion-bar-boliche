import { Injectable } from '@nestjs/common';

import { UpdateReservationUseCase } from './update-reservation.use-case';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';
import { UpdateReservationResponseDto } from './dto/update-reservation.response.dto';

@Injectable()
export class UpdateReservationService {
  constructor(
    private readonly useCase: UpdateReservationUseCase,
  ) {}

  execute(
    id: string,
    request: UpdateReservationRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationResponseDto> {
    return this.useCase.execute(
      id,
      request,
      usuarioId,
    );
  }
}