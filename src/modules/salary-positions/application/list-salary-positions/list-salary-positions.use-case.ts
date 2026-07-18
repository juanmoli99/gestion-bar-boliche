import { Injectable } from '@nestjs/common';

import { ListSalaryPositionsRepository } from './list-salary-positions.repository';

@Injectable()
export class ListSalaryPositionsUseCase {
  constructor(
    private readonly listSalaryPositionsRepository: ListSalaryPositionsRepository,
  ) {}

  async execute() {
    return this.listSalaryPositionsRepository.execute();
  }
}