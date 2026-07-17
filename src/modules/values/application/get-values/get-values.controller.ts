import { Controller, Get } from '@nestjs/common';

import { GetValuesService } from './get-values.service';

@Controller('values')
export class GetValuesController {
  constructor(
    private readonly service: GetValuesService,
  ) {}

  @Get()
  get() {
    return this.service.execute();
  }
}