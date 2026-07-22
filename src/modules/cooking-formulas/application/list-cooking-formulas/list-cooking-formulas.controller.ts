import {
  Controller,
  Get,
} from '@nestjs/common';

import { ListCookingFormulasService } from './list-cooking-formulas.service';

@Controller('cooking-formulas')
export class ListCookingFormulasController {
  constructor(
    private readonly listCookingFormulasService: ListCookingFormulasService,
  ) {}

  @Get()
  async execute() {
    return this.listCookingFormulasService.execute();
  }
}