import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { UpdatePurchaseItemService } from './update-purchase-item.service';
import { UpdatePurchaseItemRequestDto } from './dto/update-purchase-item.request.dto';
import { UpdatePurchaseItemResponseDto } from './dto/update-purchase-item.response.dto';

@Controller('purchases/items')
export class UpdatePurchaseItemController {
  constructor(
    private readonly updatePurchaseItemService: UpdatePurchaseItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdatePurchaseItemRequestDto,
  ): Promise<UpdatePurchaseItemResponseDto> {
    return this.updatePurchaseItemService.execute(
      id,
      request,
    );
  }
}