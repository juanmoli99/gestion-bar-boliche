import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { GetFormulaService } from './get-formula.service';

@Controller('formulas')
export class GetFormulaController {
  constructor(
    private readonly service: GetFormulaService,
  ) {}

  @Get(':id')
  async get(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.service.execute(id);
  }
}