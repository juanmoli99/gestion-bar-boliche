import { Body, Controller, Post } from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateItemService } from './create-item.service';
import { CreateItemRequestDto } from './dto/create-item.request.dto';
import { CreateItemResponseDto } from './dto/create-item.response.dto';

@Controller('inventory/items')
export class CreateItemController {
  constructor(
    private readonly createItemService: CreateItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateItemRequestDto,
  ): Promise<CreateItemResponseDto> {
    return this.createItemService.execute(request);
  }
}