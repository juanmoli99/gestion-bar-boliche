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
  UpdateFormulaService,
} from './update-formula.service';

import {
  UpdateFormulaRequestDto,
} from './dto/update-formula.request.dto';

import {
  UpdateFormulaResponseDto,
} from './dto/update-formula.response.dto';

@Controller('formulas')
export class UpdateFormulaController {
  constructor(
    private readonly service:
      UpdateFormulaService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    formulaId: string,

    @Body()
    request: UpdateFormulaRequestDto,
  ): Promise<UpdateFormulaResponseDto> {
    return this.service.execute(
      formulaId,
      request,
    );
  }
}