import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateCategoryService } from './update-category.service';
import { UpdateCategoryRequestDto } from './dto/update-category.request.dto';
import { UpdateCategoryResponseDto } from './dto/update-category.response.dto';

@Controller('inventory/categories')
export class UpdateCategoryController {
  constructor(
    private readonly updateCategoryService: UpdateCategoryService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateCategoryRequestDto,
  ): Promise<UpdateCategoryResponseDto> {
    return this.updateCategoryService.execute(
      id,
      request,
    );
  }
}