import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { DeactivateCategoryService } from './deactivate-category.service';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

@Controller('inventory/categories')
export class DeactivateCategoryController {
  constructor(
    private readonly deactivateCategoryService: DeactivateCategoryService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.deactivateCategoryService.execute(id);
  }
}