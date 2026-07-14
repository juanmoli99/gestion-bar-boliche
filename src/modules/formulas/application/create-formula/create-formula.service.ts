import { Injectable } from '@nestjs/common';

import { CreateFormulaUseCase } from './create-formula.use-case';
import { CreateFormulaRequestDto } from './dto/create-formula.request.dto';
import { CreateFormulaResponseDto } from './dto/create-formula.response.dto';

@Injectable()
export class CreateFormulaService {
  constructor(
    private readonly createFormulaUseCase: CreateFormulaUseCase,
  ) {}

  async execute(
    request: CreateFormulaRequestDto,
  ): Promise<CreateFormulaResponseDto> {
    return this.createFormulaUseCase.execute(request);
  }
}