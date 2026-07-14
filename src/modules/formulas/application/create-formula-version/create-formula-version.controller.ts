import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CreateFormulaVersionService } from './create-formula-version.service';
import { CreateFormulaVersionResponseDto } from './dto/create-formula-version.response.dto';

@Controller('formulas')
export class CreateFormulaVersionController {
  constructor(
    private readonly createFormulaVersionService: CreateFormulaVersionService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post(':id/versiones')
  async create(
    @Param('id', new ParseUUIDPipe())
    formulaId: string,
  ): Promise<CreateFormulaVersionResponseDto> {
    return this.createFormulaVersionService.execute(
      formulaId,
    );
  }
}