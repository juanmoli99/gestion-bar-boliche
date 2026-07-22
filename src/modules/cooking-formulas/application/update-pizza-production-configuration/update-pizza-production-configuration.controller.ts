import {
  Body,
  Controller,
  Patch,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  Roles,
} from '../../../../shared/decorators/roles.decorator';

import {
  UpdatePizzaProductionConfigurationService,
} from './update-pizza-production-configuration.service';

import {
  UpdatePizzaProductionConfigurationRequestDto,
} from './dto/update-pizza-production-configuration.request.dto';

import {
  UpdatePizzaProductionConfigurationResponseDto,
} from './dto/update-pizza-production-configuration.response.dto';

@Controller(
  'cooking-formulas/pizza-production-configuration',
)
export class UpdatePizzaProductionConfigurationController {
  constructor(
    private readonly service:
      UpdatePizzaProductionConfigurationService,
  ) {}

  @Roles(
    RolUsuario.ADMINISTRADOR,
  )
  @Patch()
  async update(
    @Body()
    request:
      UpdatePizzaProductionConfigurationRequestDto,
  ): Promise<UpdatePizzaProductionConfigurationResponseDto> {
    return this.service.execute(
      request,
    );
  }
}