import { Injectable } from '@nestjs/common';

import { CreateCookingFormulaUseCase } from './create-cooking-formula.use-case';
import { CreateCookingFormulaRequestDto } from './dto/create-cooking-formula.request.dto';
import { CreateCookingFormulaResponseDto } from './dto/create-cooking-formula.response.dto';

@Injectable()
export class CreateCookingFormulaService {
  constructor(
    private readonly createCookingFormulaUseCase: CreateCookingFormulaUseCase,
  ) {}

  async execute(
    request: CreateCookingFormulaRequestDto,
  ): Promise<CreateCookingFormulaResponseDto> {
    return this.createCookingFormulaUseCase.execute(
      request,
    );
  }
}