import { Controller, Get } from '@nestjs/common';

import { ListItemsService } from './list-items.service';
import { ListItemsResponseDto } from './dto/list-items.response.dto';

@Controller('inventory/items')
export class ListItemsController {
  constructor(
    private readonly listItemsService: ListItemsService,
  ) {}

  @Get()
  async list(): Promise<ListItemsResponseDto[]> {
    return this.listItemsService.execute();
  }
}