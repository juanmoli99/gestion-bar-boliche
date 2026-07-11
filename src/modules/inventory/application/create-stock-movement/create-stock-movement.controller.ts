import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateStockMovementService } from './create-stock-movement.service';
import { CreateStockMovementRequestDto } from './dto/create-stock-movement.request.dto';
import { CreateStockMovementResponseDto } from './dto/create-stock-movement.response.dto';

@Controller('inventory/stock-movements')
export class CreateStockMovementController {
  constructor(
    private readonly createStockMovementService: CreateStockMovementService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateStockMovementRequestDto,
    @CurrentUser() user: { id: string },
  ): Promise<CreateStockMovementResponseDto> {
    return this.createStockMovementService.execute(
      request,
      user.id,
    );
  }
}