import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { DeactivateSupplierService } from './deactivate-supplier.service';

@Controller('suppliers')
export class DeactivateSupplierController {
  constructor(
    private readonly deactivateSupplierService: DeactivateSupplierService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.deactivateSupplierService.execute(id);
  }
}