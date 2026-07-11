import { Controller, Get } from '@nestjs/common';

import { ListStockMovementsService } from './list-stock-movements.service';
import { ListStockMovementsResponseDto } from './dto/list-stock-movements.response.dto';

@Controller('inventory/stock-movements')
export class ListStockMovementsController {
  constructor(
    private readonly listStockMovementsService: ListStockMovementsService,
  ) {}

  @Get()
  async list(): Promise<ListStockMovementsResponseDto[]> {
    return this.listStockMovementsService.execute();
  }
}