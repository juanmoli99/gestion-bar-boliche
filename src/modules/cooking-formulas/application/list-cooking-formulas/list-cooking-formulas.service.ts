import { Injectable } from '@nestjs/common';

import { ListCookingFormulasUseCase } from './list-cooking-formulas.use-case';

@Injectable()
export class ListCookingFormulasService {
  constructor(
    private readonly listCookingFormulasUseCase: ListCookingFormulasUseCase,
  ) {}

  async execute() {
    return this.listCookingFormulasUseCase.execute();
  }
}