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

import { DeletePurchaseItemService } from './delete-purchase-item.service';

@Controller('purchases/items')
export class DeletePurchaseItemController {
  constructor(
    private readonly deletePurchaseItemService: DeletePurchaseItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.deletePurchaseItemService.execute(
      id,
    );
  }
}