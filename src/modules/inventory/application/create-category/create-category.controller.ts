import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateCategoryService } from './create-category.service';
import { CreateCategoryRequestDto } from './dto/create-category.request.dto';
import { CreateCategoryResponseDto } from './dto/create-category.response.dto';

@Controller('inventory/categories')
export class CreateCategoryController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.createCategoryService.execute(request);
  }
}