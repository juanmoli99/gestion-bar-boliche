import { Injectable } from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';

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
    userId: string,
    rol: RolUsuario,
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    return this.inventoryCountUseCase.execute(
      stockId,
      userId,
      rol,
      request,
    );
  }
}