import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { TipoInventario } from '../../../../generated/prisma/enums';

import { ListCategoriesByInventoryService } from './list-categories-by-inventory.service';
import { ListCategoriesByInventoryResponseDto } from './dto/list-categories-by-inventory.response.dto';

@Controller('inventory/categories')
export class ListCategoriesByInventoryController {
  constructor(
    private readonly listCategoriesByInventoryService: ListCategoriesByInventoryService,
  ) {}

  @Get('by-inventory/:inventario')
  async listByInventory(
    @Param('inventario') inventario: TipoInventario,
  ): Promise<ListCategoriesByInventoryResponseDto[]> {
    return this.listCategoriesByInventoryService.execute(
      inventario,
    );
  }
}