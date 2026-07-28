import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { HidePurchaseService } from './hide-purchase.service';

@Controller('purchases')
export class HidePurchaseController {
  constructor(
    private readonly hidePurchaseService:
      HidePurchaseService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/hide')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hide(
    @Param('id', ParseUUIDPipe)
    purchaseId: string,
  ): Promise<void> {
    return this.hidePurchaseService.execute(
      purchaseId,
    );
  }
}