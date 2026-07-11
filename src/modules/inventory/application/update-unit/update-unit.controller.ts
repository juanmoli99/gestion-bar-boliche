import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateUnitService } from './update-unit.service';
import { UpdateUnitRequestDto } from './dto/update-unit.request.dto';
import { UpdateUnitResponseDto } from './dto/update-unit.response.dto';

@Controller('inventory/units')
export class UpdateUnitController {
  constructor(
    private readonly updateUnitService: UpdateUnitService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateUnitRequestDto,
  ): Promise<UpdateUnitResponseDto> {
    return this.updateUnitService.execute(id, request);
  }
}