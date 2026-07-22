import {
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
  DeactivateCookingFormulaService,
} from './deactivate-cooking-formula.service';

import {
  DeactivateCookingFormulaResponseDto,
} from './dto/deactivate-cooking-formula.response.dto';

@Controller('cooking-formulas')
export class DeactivateCookingFormulaController {
  constructor(
    private readonly service:
      DeactivateCookingFormulaService,
  ) {}

  @Roles(
    RolUsuario.ADMINISTRADOR,
  )
  @Patch(':id/deactivate')
  deactivate(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    formulaId: string,
  ): Promise<DeactivateCookingFormulaResponseDto> {
    return this.service.execute(
      formulaId,
    );
  }
}