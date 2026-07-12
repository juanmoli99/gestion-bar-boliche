import { Injectable } from '@nestjs/common';

import { DeletePurchaseItemUseCase } from './delete-purchase-item.use-case';

@Injectable()
export class DeletePurchaseItemService {
  constructor(
    private readonly deletePurchaseItemUseCase: DeletePurchaseItemUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    return this.deletePurchaseItemUseCase.execute(
      id,
    );
  }
}