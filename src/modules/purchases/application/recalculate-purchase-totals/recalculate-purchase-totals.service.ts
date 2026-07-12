import { Injectable } from '@nestjs/common';

import { RecalculatePurchaseTotalsUseCase } from './recalculate-purchase-totals.use-case';

@Injectable()
export class RecalculatePurchaseTotalsService {
  constructor(
    private readonly recalculatePurchaseTotalsUseCase: RecalculatePurchaseTotalsUseCase,
  ) {}

  async execute(
    compraId: string,
  ): Promise<void> {
    return this.recalculatePurchaseTotalsUseCase.execute(
      compraId,
    );
  }
}