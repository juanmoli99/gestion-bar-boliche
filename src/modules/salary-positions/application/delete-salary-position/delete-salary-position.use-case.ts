import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DeleteSalaryPositionRepository } from './delete-salary-position.repository';

@Injectable()
export class DeleteSalaryPositionUseCase {
  constructor(
    private readonly repository: DeleteSalaryPositionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const puesto =
      await this.repository.findById(id);

    if (!puesto) {
      throw new NotFoundException(
        'El puesto de trabajo no existe.',
      );
    }

    await this.repository.delete(id);
  }
}