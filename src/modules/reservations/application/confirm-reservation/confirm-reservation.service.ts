import { Injectable } from '@nestjs/common';

import { ConfirmReservationUseCase } from './confirm-reservation.use-case';

@Injectable()
export class ConfirmReservationService {
  constructor(
    private readonly useCase: ConfirmReservationUseCase,
  ) {}

  execute(id: string) {
    return this.useCase.execute(id);
  }
}