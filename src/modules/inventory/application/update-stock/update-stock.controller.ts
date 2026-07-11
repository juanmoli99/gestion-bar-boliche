import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateStockService } from './update-stock.service';
import { UpdateStockRequestDto } from './dto/update-stock.request.dto';
import { UpdateStockResponseDto } from './dto/update-stock.response.dto';

@Controller('inventory/stocks')
export class UpdateStockController {
  constructor(
    private readonly updateStockService: UpdateStockService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateStockRequestDto,
  ): Promise<UpdateStockResponseDto> {
    return this.updateStockService.execute(id, request);
  }
}