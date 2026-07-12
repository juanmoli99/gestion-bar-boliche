import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { AddPurchaseItemService } from './add-purchase-item.service';
import { AddPurchaseItemRequestDto } from './dto/add-purchase-item.request.dto';
import { AddPurchaseItemResponseDto } from './dto/add-purchase-item.response.dto';

@Controller('purchases')
export class AddPurchaseItemController {
  constructor(
    private readonly addPurchaseItemService: AddPurchaseItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post(':id/items')
  async addItem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: AddPurchaseItemRequestDto,
  ): Promise<AddPurchaseItemResponseDto> {
    return this.addPurchaseItemService.execute(
      id,
      request,
    );
  }
}