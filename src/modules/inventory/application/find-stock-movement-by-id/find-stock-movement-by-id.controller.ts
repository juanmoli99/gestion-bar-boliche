import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { FindStockMovementByIdService } from './find-stock-movement-by-id.service';
import { FindStockMovementByIdResponseDto } from './dto/find-stock-movement-by-id.response.dto';

@Controller('inventory/stock-movements')
export class FindStockMovementByIdController {
  constructor(
    private readonly findStockMovementByIdService: FindStockMovementByIdService,
  ) {}

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FindStockMovementByIdResponseDto> {
    return this.findStockMovementByIdService.execute(id);
  }
}