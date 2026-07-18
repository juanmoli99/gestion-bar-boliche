import { Controller, Get } from '@nestjs/common';

import { ListSalaryPositionsService } from './list-salary-positions.service';

@Controller('salary-positions')
export class ListSalaryPositionsController {
  constructor(
    private readonly listSalaryPositionsService: ListSalaryPositionsService,
  ) {}

  @Get()
  async execute() {
    return this.listSalaryPositionsService.execute();
  }
}