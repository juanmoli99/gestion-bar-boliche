import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateUnitService } from './create-unit.service';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';
import { CreateUnitResponseDto } from './dto/create-unit.response.dto';

@Controller('inventory/units')
export class CreateUnitController {
  constructor(
    private readonly createUnitService: CreateUnitService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateUnitRequestDto,
  ): Promise<CreateUnitResponseDto> {
    return this.createUnitService.execute(request);
  }
}