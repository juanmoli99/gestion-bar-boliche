import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  Roles,
} from '../../../../shared/decorators/roles.decorator';

import {
  UpdateCookingFormulaService,
} from './update-cooking-formula.service';

import {
  UpdateCookingFormulaRequestDto,
} from './dto/update-cooking-formula.request.dto';

import {
  UpdateCookingFormulaResponseDto,
} from './dto/update-cooking-formula.response.dto';

@Controller('cooking-formulas')
export class UpdateCookingFormulaController {
  constructor(
    private readonly service:
      UpdateCookingFormulaService,
  ) {}

  @Roles(
    RolUsuario.ADMINISTRADOR,
  )
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    formulaId: string,

    @Body()
    request:
      UpdateCookingFormulaRequestDto,
  ): Promise<UpdateCookingFormulaResponseDto> {
    return this.service.execute(
      formulaId,
      request,
    );
  }
}