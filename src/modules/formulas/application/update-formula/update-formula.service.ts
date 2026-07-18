import {
  Injectable,
} from '@nestjs/common';

import {
  UpdateFormulaUseCase,
} from './update-formula.use-case';

import {
  UpdateFormulaRequestDto,
} from './dto/update-formula.request.dto';

import {
  UpdateFormulaResponseDto,
} from './dto/update-formula.response.dto';

@Injectable()
export class UpdateFormulaService {
  constructor(
    private readonly useCase:
      UpdateFormulaUseCase,
  ) {}

  execute(
    formulaId: string,
    request: UpdateFormulaRequestDto,
  ): Promise<UpdateFormulaResponseDto> {
    return this.useCase.execute(
      formulaId,
      request,
    );
  }
}