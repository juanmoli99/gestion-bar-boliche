import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { FindStockByIdService } from './find-stock-by-id.service';
import { FindStockByIdResponseDto } from './dto/find-stock-by-id.response.dto';

@Controller('inventory/stocks')
export class FindStockByIdController {
  constructor(
    private readonly findStockByIdService: FindStockByIdService,
  ) {}

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FindStockByIdResponseDto> {
    return this.findStockByIdService.execute(id);
  }
}