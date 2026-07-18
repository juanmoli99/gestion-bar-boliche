import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateSalaryPositionService } from './update-salary-position.service';
import { UpdateSalaryPositionRequestDto } from './dto/update-salary-position.request.dto';
import { UpdateSalaryPositionResponseDto } from './dto/update-salary-position.response.dto';

@Controller('salary-positions')
export class UpdateSalaryPositionController {
  constructor(
    private readonly updateSalaryPositionService: UpdateSalaryPositionService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateSalaryPositionRequestDto,
  ): Promise<UpdateSalaryPositionResponseDto> {
    return this.updateSalaryPositionService.execute(
      id,
      request,
    );
  }
}