import {
  Body,
  Controller,
  Patch,
} from '@nestjs/common';

import {
  CurrentUser,
} from '../../../../shared/decorators/current-user.decorator';

import {
  Roles,
} from '../../../../shared/decorators/roles.decorator';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  BulkInventoryCountService,
} from './bulk-inventory-count.service';

import {
  BulkInventoryCountRequestDto,
} from './dto/bulk-inventory-count.request.dto';

import {
  BulkInventoryCountResponseDto,
} from './dto/bulk-inventory-count.response.dto';

@Controller('inventory/stocks')
export class BulkInventoryCountController {
  constructor(
    private readonly service:
      BulkInventoryCountService,
  ) {}

  @Roles(
    RolUsuario.ADMINISTRADOR,
  )
  @Patch('count')
  async count(
    @CurrentUser()
    user: {
      id: string;
    },

    @Body()
    request:
      BulkInventoryCountRequestDto,
  ): Promise<BulkInventoryCountResponseDto> {
    return this.service.execute(
      user.id,
      request,
    );
  }
}