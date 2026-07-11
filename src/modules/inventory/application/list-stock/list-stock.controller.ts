import { Controller, Get } from '@nestjs/common';

import { ListStockService } from './list-stock.service';
import { ListStockResponseDto } from './dto/list-stock.response.dto';

@Controller('inventory/stocks')
export class ListStockController {
  constructor(
    private readonly listStockService: ListStockService,
  ) {}

  @Get()
  async list(): Promise<ListStockResponseDto[]> {
    return this.listStockService.execute();
  }
}