import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { ReactivateItemService } from './reactivate-item.service';
import { ReactivateItemResponseDto } from './dto/reactivate-item.response.dto';

@Controller('inventory/items')
export class ReactivateItemController {
  constructor(
    private readonly reactivateItemService: ReactivateItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/reactivate')
  async reactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReactivateItemResponseDto> {
    return this.reactivateItemService.execute(id);
  }
}