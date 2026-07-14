import { Injectable } from '@nestjs/common';

import { ListReservationsUseCase } from './list-reservations.use-case';
import { ListReservationsRequestDto } from './dto/list-reservations.request.dto';

@Injectable()
export class ListReservationsService {
  constructor(
    private readonly useCase: ListReservationsUseCase,
  ) {}

  execute(
    request: ListReservationsRequestDto,
  ) {
    return this.useCase.execute(request);
  }
}