import { Injectable } from '@nestjs/common';

import { ListPurchaseItemsUseCase } from './list-purchase-items.use-case';
import { ListPurchaseItemsResponseDto } from './dto/list-purchase-items.response.dto';

@Injectable()
export class ListPurchaseItemsService {
  constructor(
    private readonly listPurchaseItemsUseCase: ListPurchaseItemsUseCase,
  ) {}

  async execute(
    compraId: string,
  ): Promise<ListPurchaseItemsResponseDto[]> {
    return this.listPurchaseItemsUseCase.execute(
      compraId,
    );
  }
}