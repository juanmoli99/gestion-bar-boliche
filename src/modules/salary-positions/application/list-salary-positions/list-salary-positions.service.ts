import { Injectable } from '@nestjs/common';

import { ListSalaryPositionsUseCase } from './list-salary-positions.use-case';

@Injectable()
export class ListSalaryPositionsService {
  constructor(
    private readonly listSalaryPositionsUseCase: ListSalaryPositionsUseCase,
  ) {}

  async execute() {
    return this.listSalaryPositionsUseCase.execute();
  }
}