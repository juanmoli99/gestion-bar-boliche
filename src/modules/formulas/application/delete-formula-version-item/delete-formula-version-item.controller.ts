import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { DeleteFormulaVersionItemService } from './delete-formula-version-item.service';

@Controller('formulas/versiones')
export class DeleteFormulaVersionItemController {
  constructor(
    private readonly deleteFormulaVersionItemService: DeleteFormulaVersionItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Delete(':versionId/items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('versionId', ParseUUIDPipe)
    versionId: string,

    @Param('itemId', ParseUUIDPipe)
    itemId: string,
  ): Promise<void> {
    return this.deleteFormulaVersionItemService.execute(
      versionId,
      itemId,
    );
  }
}