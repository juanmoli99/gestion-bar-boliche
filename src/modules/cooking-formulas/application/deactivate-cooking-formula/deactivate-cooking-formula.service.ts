import {
  Injectable,
} from '@nestjs/common';

import {
  DeactivateCookingFormulaUseCase,
} from './deactivate-cooking-formula.use-case';

import {
  DeactivateCookingFormulaResponseDto,
} from './dto/deactivate-cooking-formula.response.dto';

@Injectable()
export class DeactivateCookingFormulaService {
  constructor(
    private readonly useCase:
      DeactivateCookingFormulaUseCase,
  ) {}

  execute(
    formulaId: string,
  ): Promise<DeactivateCookingFormulaResponseDto> {
    return this.useCase.execute(
      formulaId,
    );
  }
}