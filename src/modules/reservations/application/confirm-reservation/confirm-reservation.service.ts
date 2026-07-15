import { Injectable } from '@nestjs/common';

import { ConfirmReservationUseCase } from './confirm-reservation.use-case';
import { ConfirmReservationResponseDto } from './dto/confirm-reservation.response.dto';

@Injectable()
export class ConfirmReservationService {
  constructor(
    private readonly useCase: ConfirmReservationUseCase,
  ) {}

  execute(
    id: string,
    usuarioId: string,
  ): Promise<ConfirmReservationResponseDto> {
    return this.useCase.execute(
      id,
      usuarioId,
    );
  }
}