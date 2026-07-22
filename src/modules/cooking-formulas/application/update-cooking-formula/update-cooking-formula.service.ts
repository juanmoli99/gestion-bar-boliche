import {
  Injectable,
} from '@nestjs/common';

import {
  UpdateCookingFormulaUseCase,
} from './update-cooking-formula.use-case';

import {
  UpdateCookingFormulaRequestDto,
} from './dto/update-cooking-formula.request.dto';

import {
  UpdateCookingFormulaResponseDto,
} from './dto/update-cooking-formula.response.dto';

@Injectable()
export class UpdateCookingFormulaService {
  constructor(
    private readonly useCase:
      UpdateCookingFormulaUseCase,
  ) {}

  execute(
    formulaId: string,
    request: UpdateCookingFormulaRequestDto,
  ): Promise<UpdateCookingFormulaResponseDto> {
    return this.useCase.execute(
      formulaId,
      request,
    );
  }
}