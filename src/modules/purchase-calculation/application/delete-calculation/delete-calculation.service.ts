import { Injectable } from '@nestjs/common';

import { DeleteCalculationUseCase } from './delete-calculation.use-case';
import { DeleteCalculationResponseDto } from './dto/delete-calculation.response.dto';

@Injectable()
export class DeleteCalculationService {
  constructor(
    private readonly useCase: DeleteCalculationUseCase,
  ) {}

  execute(
    id: string,
  ): Promise<DeleteCalculationResponseDto> {
    return this.useCase.execute(id);
  }
}