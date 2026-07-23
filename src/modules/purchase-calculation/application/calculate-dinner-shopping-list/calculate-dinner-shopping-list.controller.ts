import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  Roles,
} from '../../../../shared/decorators/roles.decorator';

import {
  CalculateDinnerShoppingListService,
} from './calculate-dinner-shopping-list.service';

import {
  CalculateDinnerShoppingListRequestDto,
} from './dto/calculate-dinner-shopping-list.request.dto';

import {
  CalculateDinnerShoppingListResponseDto,
} from './dto/calculate-dinner-shopping-list.response.dto';

@Controller('purchase-calculation')
export class CalculateDinnerShoppingListController {
  constructor(
    private readonly service: CalculateDinnerShoppingListService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post('dinner-shopping-list')
  async calculate(
    @Body()
    request: CalculateDinnerShoppingListRequestDto,
  ): Promise<CalculateDinnerShoppingListResponseDto> {
    return this.service.execute(request);
  }
}