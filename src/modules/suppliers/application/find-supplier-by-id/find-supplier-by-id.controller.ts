import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { FindSupplierByIdService } from './find-supplier-by-id.service';
import { FindSupplierByIdResponseDto } from './dto/find-supplier-by-id.response.dto';

@Controller('suppliers')
export class FindSupplierByIdController {
  constructor(
    private readonly findSupplierByIdService: FindSupplierByIdService,
  ) {}

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FindSupplierByIdResponseDto> {
    return this.findSupplierByIdService.execute(id);
  }
}