import { Injectable } from '@nestjs/common';

import { InventoryCountUseCase } from './inventory-count.use-case';
import { InventoryCountRequestDto } from './dto/inventory-count.request.dto';
import { InventoryCountResponseDto } from './dto/inventory-count.response.dto';

@Injectable()
export class InventoryCountService {
  constructor(
    private readonly inventoryCountUseCase: InventoryCountUseCase,
  ) {}

  async execute(
    stockId: string,
    usuarioId: string,
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    return this.inventoryCountUseCase.execute(
      stockId,
      usuarioId,
      request,
    );
  }
}