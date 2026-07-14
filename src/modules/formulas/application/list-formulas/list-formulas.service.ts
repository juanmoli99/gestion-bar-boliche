import { Injectable } from '@nestjs/common';

import { ListFormulasUseCase } from './list-formulas.use-case';

@Injectable()
export class ListFormulasService {
  constructor(
    private readonly useCase: ListFormulasUseCase,
  ) {}

  async execute() {
    return this.useCase.execute();
  }
}