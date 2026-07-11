import { Injectable } from '@nestjs/common';

import { TipoInventario } from '../../../../generated/prisma/enums';

import { ListCategoriesByInventoryRepository } from './list-categories-by-inventory.repository';
import { ListCategoriesByInventoryResponseDto } from './dto/list-categories-by-inventory.response.dto';

@Injectable()
export class ListCategoriesByInventoryUseCase {
  constructor(
    private readonly repository: ListCategoriesByInventoryRepository,
  ) {}

  async execute(
    inventario: TipoInventario,
  ): Promise<ListCategoriesByInventoryResponseDto[]> {
    return this.repository.findByInventory(inventario);
  }
}