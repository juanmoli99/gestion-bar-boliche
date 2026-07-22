import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  GetPizzaProductionConfigurationService,
} from './get-pizza-production-configuration.service';

import {
  GetPizzaProductionConfigurationResponseDto,
} from './dto/get-pizza-production-configuration.response.dto';

@Controller(
  'cooking-formulas/pizza-production-configuration',
)
export class GetPizzaProductionConfigurationController {
  constructor(
    private readonly service:
      GetPizzaProductionConfigurationService,
  ) {}

  @Get()
  async get(): Promise<GetPizzaProductionConfigurationResponseDto> {
    return this.service.execute();
  }
}