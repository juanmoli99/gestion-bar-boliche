import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { HidePurchaseRepository } from './hide-purchase.repository';

@Injectable()
export class HidePurchaseUseCase {
  constructor(
    private readonly hidePurchaseRepository:
      HidePurchaseRepository,
  ) {}

  async execute(
    purchaseId: string,
  ): Promise<void> {
    try {
      await this.hidePurchaseRepository.hide(
        purchaseId,
      );
    } catch {
      throw new NotFoundException(
        'Compra no encontrada',
      );
    }
  }
}