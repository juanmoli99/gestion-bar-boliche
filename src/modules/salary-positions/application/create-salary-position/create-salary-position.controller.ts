import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateSalaryPositionService } from './create-salary-position.service';
import { CreateSalaryPositionRequestDto } from './dto/create-salary-position.request.dto';
import { CreateSalaryPositionResponseDto } from './dto/create-salary-position.response.dto';

@Controller('salary-positions')
export class CreateSalaryPositionController {
  constructor(
    private readonly createSalaryPositionService: CreateSalaryPositionService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateSalaryPositionRequestDto,
  ): Promise<CreateSalaryPositionResponseDto> {
    return this.createSalaryPositionService.execute(request);
  }
}