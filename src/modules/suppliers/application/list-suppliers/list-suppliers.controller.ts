import {
  Controller,
  Get,
} from '@nestjs/common';

import { ListSuppliersService } from './list-suppliers.service';
import { ListSuppliersResponseDto } from './dto/list-suppliers.response.dto';

@Controller('suppliers')
export class ListSuppliersController {
  constructor(
    private readonly listSuppliersService: ListSuppliersService,
  ) {}

  @Get()
  async list(): Promise<ListSuppliersResponseDto[]> {
    return this.listSuppliersService.execute();
  }
}