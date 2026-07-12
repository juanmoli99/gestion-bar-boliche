import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ReactivateCategoryService } from './reactivate-category.service';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

@Controller('inventory/categories')
export class ReactivateCategoryController {
  constructor(
    private readonly reactivateCategoryService: ReactivateCategoryService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/reactivate')
  async reactivate(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reactivateCategoryService.execute(id);
  }
}