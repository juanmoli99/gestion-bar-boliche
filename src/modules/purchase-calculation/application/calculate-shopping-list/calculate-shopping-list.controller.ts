import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CalculateShoppingListService } from './calculate-shopping-list.service';
import { CalculateShoppingListRequestDto } from './dto/calculate-shopping-list.request.dto';
import { CalculateShoppingListResponseDto } from './dto/calculate-shopping-list.response.dto';

@Controller('purchase-calculation')
export class CalculateShoppingListController {
  constructor(
    private readonly service: CalculateShoppingListService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post('shopping-list')
  async calculate(
    @Body()
    request: CalculateShoppingListRequestDto,
  ): Promise<CalculateShoppingListResponseDto> {
    return this.service.execute(request);
  }
}