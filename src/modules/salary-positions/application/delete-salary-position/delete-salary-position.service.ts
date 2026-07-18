import { Injectable } from '@nestjs/common';

import { DeleteSalaryPositionUseCase } from './delete-salary-position.use-case';

@Injectable()
export class DeleteSalaryPositionService {
  constructor(
    private readonly deleteSalaryPositionUseCase: DeleteSalaryPositionUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    return this.deleteSalaryPositionUseCase.execute(
      id,
    );
  }
}