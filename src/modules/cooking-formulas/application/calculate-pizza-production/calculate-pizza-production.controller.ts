import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CalculatePizzaProductionService } from './calculate-pizza-production.service';
import { CalculatePizzaProductionRequestDto } from './dto/calculate-pizza-production.request.dto';

@Controller('pizza-production')
export class CalculatePizzaProductionController {
  constructor(
    private readonly service: CalculatePizzaProductionService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  calculate(
    @Body()
    request: CalculatePizzaProductionRequestDto,
  ) {
    return this.service.execute(
      request,
    );
  }
}