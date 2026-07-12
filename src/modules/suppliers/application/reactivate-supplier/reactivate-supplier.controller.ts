import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { ReactivateSupplierService } from './reactivate-supplier.service';

@Controller('suppliers')
export class ReactivateSupplierController {
  constructor(
    private readonly reactivateSupplierService: ReactivateSupplierService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/reactivate')
  async reactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.reactivateSupplierService.execute(id);
  }
}