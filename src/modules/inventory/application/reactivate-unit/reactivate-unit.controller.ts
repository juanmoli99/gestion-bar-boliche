import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';
import { ReactivateUnitService } from './reactivate-unit.service';

@Controller('inventory/units')
export class ReactivateUnitController {
  constructor(
    private readonly reactivateUnitService: ReactivateUnitService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/reactivate')
  async reactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.reactivateUnitService.execute(id);
  }
}