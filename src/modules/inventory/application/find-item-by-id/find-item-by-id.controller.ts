import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { FindItemByIdService } from './find-item-by-id.service';
import { FindItemByIdResponseDto } from './dto/find-item-by-id.response.dto';

@Controller('inventory/items')
export class FindItemByIdController {
  constructor(
    private readonly findItemByIdService: FindItemByIdService,
  ) {}

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FindItemByIdResponseDto> {
    return this.findItemByIdService.execute(id);
  }
}