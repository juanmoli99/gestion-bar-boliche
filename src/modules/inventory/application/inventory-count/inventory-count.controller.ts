import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { InventoryCountService } from './inventory-count.service';
import { InventoryCountRequestDto } from './dto/inventory-count.request.dto';
import { InventoryCountResponseDto } from './dto/inventory-count.response.dto';

@Controller('inventory/stocks')
export class InventoryCountController {
  constructor(
    private readonly inventoryCountService: InventoryCountService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/count')
  async count(
    @Param('id', ParseUUIDPipe)
    id: string,
    @CurrentUser()
    user: {
      id: string;
    },
    @Body()
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    return this.inventoryCountService.execute(
      id,
      user.id,
      request,
    );
  }
}