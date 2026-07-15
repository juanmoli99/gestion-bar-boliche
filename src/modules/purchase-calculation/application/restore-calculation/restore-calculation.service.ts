import { Injectable } from '@nestjs/common';

import { RestoreCalculationUseCase } from './restore-calculation.use-case';
import { RestoreCalculationResponseDto } from './dto/restore-calculation.response.dto';

@Injectable()
export class RestoreCalculationService {
  constructor(
    private readonly useCase: RestoreCalculationUseCase,
  ) {}

  execute(
    id: string,
  ): Promise<RestoreCalculationResponseDto> {
    return this.useCase.execute(id);
  }
}