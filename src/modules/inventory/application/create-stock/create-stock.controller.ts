import { Body, Controller, Post } from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateStockService } from './create-stock.service';
import { CreateStockRequestDto } from './dto/create-stock.request.dto';
import { CreateStockResponseDto } from './dto/create-stock.response.dto';

@Controller('inventory/stocks')
export class CreateStockController {
  constructor(
    private readonly createStockService: CreateStockService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateStockRequestDto,
  ): Promise<CreateStockResponseDto> {
    return this.createStockService.execute(request);
  }
}