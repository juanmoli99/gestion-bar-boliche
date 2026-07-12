import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { ConfirmPurchaseService } from './confirm-purchase.service';
import { ConfirmPurchaseResponseDto } from './dto/confirm-purchase.response.dto';

@Controller('purchases')
export class ConfirmPurchaseController {
  constructor(
    private readonly confirmPurchaseService: ConfirmPurchaseService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/confirm')
  async confirm(
    @Param('id', new ParseUUIDPipe()) compraId: string,
    @CurrentUser() user: {
      id: string;
      usuario: string;
      rol: string;
    },
  ): Promise<ConfirmPurchaseResponseDto> {
    return this.confirmPurchaseService.execute(
      compraId,
      user.id,
    );
  }
}