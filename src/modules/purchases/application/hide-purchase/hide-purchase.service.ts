import {
  Injectable,
} from '@nestjs/common';

import { HidePurchaseUseCase } from './hide-purchase.use-case';

@Injectable()
export class HidePurchaseService {
  constructor(
    private readonly hidePurchaseUseCase:
      HidePurchaseUseCase,
  ) {}

  async execute(
    purchaseId: string,
  ): Promise<void> {
    return this.hidePurchaseUseCase.execute(
      purchaseId,
    );
  }
}