import { Injectable } from '@nestjs/common';

import { CreateFormulaVersionUseCase } from './create-formula-version.use-case';
import { CreateFormulaVersionResponseDto } from './dto/create-formula-version.response.dto';

@Injectable()
export class CreateFormulaVersionService {
  constructor(
    private readonly createFormulaVersionUseCase: CreateFormulaVersionUseCase,
  ) {}

  async execute(
    formulaId: string,
  ): Promise<CreateFormulaVersionResponseDto> {
    return this.createFormulaVersionUseCase.execute(
      formulaId,
    );
  }
}