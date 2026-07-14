import {
  Controller,
  Get,
} from '@nestjs/common';

import { ListFormulasService } from './list-formulas.service';

@Controller('formulas')
export class ListFormulasController {
  constructor(
    private readonly service: ListFormulasService,
  ) {}

  @Get()
  async list() {
    return this.service.execute();
  }
}