import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { ListStockService } from './list-stock.service';
import { ListStockResponseDto } from './dto/list-stock.response.dto';

@Controller('inventory/stocks')
export class ListStockController {
  constructor(
    private readonly listStockService: ListStockService,
  ) {}

  @Get()
  async list(
    @CurrentUser()
    user: {
      id: string;
      rol: RolUsuario;
    },
  ): Promise<ListStockResponseDto[]> {
    return this.listStockService.execute(user.rol);
  }
} 