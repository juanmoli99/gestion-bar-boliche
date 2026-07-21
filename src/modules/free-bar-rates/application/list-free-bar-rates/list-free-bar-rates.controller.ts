import {
  Controller,
  Get,
} from '@nestjs/common';

import { ListFreeBarRatesService } from './list-free-bar-rates.service';

@Controller('free-bar-rates')
export class ListFreeBarRatesController {
  constructor(
    private readonly listFreeBarRatesService: ListFreeBarRatesService,
  ) {}

  @Get()
  async execute() {
    return this.listFreeBarRatesService.execute();
  }
}