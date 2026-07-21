import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DeleteFreeBarRateRepository } from './delete-free-bar-rate.repository';

@Injectable()
export class DeleteFreeBarRateUseCase {
  constructor(
    private readonly repository: DeleteFreeBarRateRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const tarifa =
      await this.repository.findById(id);

    if (!tarifa) {
      throw new NotFoundException(
        'La tarifa de barra libre no existe.',
      );
    }

    await this.repository.delete(id);
  }
}