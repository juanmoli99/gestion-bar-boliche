import { Injectable } from '@nestjs/common';

import { GetFormulaUseCase } from './get-formula.use-case';

@Injectable()
export class GetFormulaService {
  constructor(
    private readonly useCase: GetFormulaUseCase,
  ) {}

  async execute(id: string) {
    return this.useCase.execute(id);
  }
}