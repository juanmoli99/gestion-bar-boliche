import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateItemService } from './update-item.service';
import { UpdateItemRequestDto } from './dto/update-item.request.dto';
import { UpdateItemResponseDto } from './dto/update-item.response.dto';

@Controller('inventory/items')
export class UpdateItemController {
  constructor(
    private readonly updateItemService: UpdateItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateItemRequestDto,
  ): Promise<UpdateItemResponseDto> {
    return this.updateItemService.execute(id, request);
  }
}