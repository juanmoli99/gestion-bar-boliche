import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CreateFormulaService } from './create-formula.service';
import { CreateFormulaRequestDto } from './dto/create-formula.request.dto';
import { CreateFormulaResponseDto } from './dto/create-formula.response.dto';

@Controller('formulas')
export class CreateFormulaController {
  constructor(
    private readonly createFormulaService: CreateFormulaService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateFormulaRequestDto,
  ): Promise<CreateFormulaResponseDto> {
    return this.createFormulaService.execute(request);
  }
}