import { Controller, Get } from '@nestjs/common';

import { ListUnitsService } from './list-units.service';
import { ListUnitsResponseDto } from './dto/list-units.response.dto';

@Controller('inventory/units')
export class ListUnitsController {
  constructor(
    private readonly listUnitsService: ListUnitsService,
  ) {}

  @Get()
  async list(): Promise<ListUnitsResponseDto[]> {
    return this.listUnitsService.execute();
  }
}