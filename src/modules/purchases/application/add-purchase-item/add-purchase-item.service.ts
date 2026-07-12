import { Injectable } from '@nestjs/common';

import { AddPurchaseItemUseCase } from './add-purchase-item.use-case';
import { AddPurchaseItemRequestDto } from './dto/add-purchase-item.request.dto';
import { AddPurchaseItemResponseDto } from './dto/add-purchase-item.response.dto';

@Injectable()
export class AddPurchaseItemService {
  constructor(
    private readonly addPurchaseItemUseCase: AddPurchaseItemUseCase,
  ) {}

  async execute(
    compraId: string,
    request: AddPurchaseItemRequestDto,
  ): Promise<AddPurchaseItemResponseDto> {
    return this.addPurchaseItemUseCase.execute(
      compraId,
      request,
    );
  }
}