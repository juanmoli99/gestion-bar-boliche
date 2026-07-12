import { Injectable } from '@nestjs/common';

import { UpdatePurchaseItemUseCase } from './update-purchase-item.use-case';
import { UpdatePurchaseItemRequestDto } from './dto/update-purchase-item.request.dto';
import { UpdatePurchaseItemResponseDto } from './dto/update-purchase-item.response.dto';

@Injectable()
export class UpdatePurchaseItemService {
  constructor(
    private readonly updatePurchaseItemUseCase: UpdatePurchaseItemUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdatePurchaseItemRequestDto,
  ): Promise<UpdatePurchaseItemResponseDto> {
    return this.updatePurchaseItemUseCase.execute(
      id,
      request,
    );
  }
}