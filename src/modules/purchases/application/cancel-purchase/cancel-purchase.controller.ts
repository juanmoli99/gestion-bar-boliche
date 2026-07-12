import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { CancelPurchaseService } from './cancel-purchase.service';
import { CancelPurchaseResponseDto } from './dto/cancel-purchase.response.dto';

@Controller('purchases')
export class CancelPurchaseController {
  constructor(
    private readonly cancelPurchaseService: CancelPurchaseService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/cancel')
  async cancel(
    @Param('id', ParseUUIDPipe)
    compraId: string,
    @CurrentUser()
    user: {
      id: string;
    },
  ): Promise<CancelPurchaseResponseDto> {
    return this.cancelPurchaseService.execute(
      compraId,
      user.id,
    );
  }
}