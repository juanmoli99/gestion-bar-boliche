import { Injectable } from '@nestjs/common';

import { TipoInventario } from '../../../../generated/prisma/enums';

import { ListCategoriesByInventoryUseCase } from './list-categories-by-inventory.use-case';
import { ListCategoriesByInventoryResponseDto } from './dto/list-categories-by-inventory.response.dto';

@Injectable()
export class ListCategoriesByInventoryService {
  constructor(
    private readonly listCategoriesByInventoryUseCase: ListCategoriesByInventoryUseCase,
  ) {}

  async execute(
    inventario: TipoInventario,
  ): Promise<ListCategoriesByInventoryResponseDto[]> {
    return this.listCategoriesByInventoryUseCase.execute(
      inventario,
    );
  }
}