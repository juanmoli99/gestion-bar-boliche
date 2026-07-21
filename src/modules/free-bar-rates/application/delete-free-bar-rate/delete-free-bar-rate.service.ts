import { Injectable } from '@nestjs/common';

import { DeleteFreeBarRateUseCase } from './delete-free-bar-rate.use-case';

@Injectable()
export class DeleteFreeBarRateService {
  constructor(
    private readonly deleteFreeBarRateUseCase: DeleteFreeBarRateUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    return this.deleteFreeBarRateUseCase.execute(
      id,
    );
  }
}