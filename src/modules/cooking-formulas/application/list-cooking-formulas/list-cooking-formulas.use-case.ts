import { Injectable } from '@nestjs/common';

import { ListCookingFormulasRepository } from './list-cooking-formulas.repository';

@Injectable()
export class ListCookingFormulasUseCase {
  constructor(
    private readonly listCookingFormulasRepository: ListCookingFormulasRepository,
  ) {}

  async execute() {
    return this.listCookingFormulasRepository.execute();
  }
}