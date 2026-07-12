import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ListPurchaseItemsService } from './list-purchase-items.service';
import { ListPurchaseItemsResponseDto } from './dto/list-purchase-items.response.dto';

@Controller('purchases')
export class ListPurchaseItemsController {
  constructor(
    private readonly listPurchaseItemsService: ListPurchaseItemsService,
  ) {}

  @Get(':id/items')
  async list(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ListPurchaseItemsResponseDto[]> {
    return this.listPurchaseItemsService.execute(
      id,
    );
  }
}