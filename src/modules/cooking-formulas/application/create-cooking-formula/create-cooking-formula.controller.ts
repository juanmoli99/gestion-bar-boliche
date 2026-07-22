import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CreateCookingFormulaService } from './create-cooking-formula.service';
import { CreateCookingFormulaRequestDto } from './dto/create-cooking-formula.request.dto';
import { CreateCookingFormulaResponseDto } from './dto/create-cooking-formula.response.dto';

@Controller('cooking-formulas')
export class CreateCookingFormulaController {
  constructor(
    private readonly createCookingFormulaService: CreateCookingFormulaService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateCookingFormulaRequestDto,
  ): Promise<CreateCookingFormulaResponseDto> {
    return this.createCookingFormulaService.execute(
      request,
    );
  }
}