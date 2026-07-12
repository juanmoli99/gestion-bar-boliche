import { DeactivateUnitService } from './deactivate-unit.service';
import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

@Controller('inventory/units')
export class DeactivateUnitController {
  constructor(
    private readonly deactivateUnitService: DeactivateUnitService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.deactivateUnitService.execute(id);
  }
}