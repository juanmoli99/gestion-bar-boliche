import { Injectable } from '@nestjs/common';

import { GenerateWeeklyPurchasesUseCase } from './generate-weekly-purchases.use-case';

@Injectable()
export class GenerateWeeklyPurchasesService {
  constructor(
    private readonly generateWeeklyPurchasesUseCase:
      GenerateWeeklyPurchasesUseCase,
  ) {}

  async execute(
    userId: string,
  ): Promise<number> {
    return this.generateWeeklyPurchasesUseCase.execute(
      userId,
    );
  }
}