import { Injectable } from '@nestjs/common';

import { UpdateReservationStatusUseCase } from './update-reservation-status.use-case';
import { UpdateReservationStatusRequestDto } from './dto/update-reservation-status.request.dto';
import { UpdateReservationStatusResponseDto } from './dto/update-reservation-status.response.dto';

@Injectable()
export class UpdateReservationStatusService {
  constructor(
    private readonly useCase: UpdateReservationStatusUseCase,
  ) {}

  execute(
    id: string,
    request: UpdateReservationStatusRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationStatusResponseDto> {
    return this.useCase.execute(
      id,
      request,
      usuarioId,
    );
  }
}