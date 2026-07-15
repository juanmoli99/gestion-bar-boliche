import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CalculatePurchasesService } from './calculate-purchases.service';
import { CalculatePurchasesRequestDto } from './dto/calculate-purchases.request.dto';

@Controller('purchase-calculation')
export class CalculatePurchasesController {
  constructor(
    private readonly service: CalculatePurchasesService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  calculate(
    @Body()
    request: CalculatePurchasesRequestDto,

    @CurrentUser()
    user: {
      id: string;
    },
  ) {
    return this.service.execute(
      request,
      user.id,
    );
  }
}