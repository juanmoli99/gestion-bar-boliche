import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { DeactivateItemService } from './deactivate-item.service';
import { DeactivateItemResponseDto } from './dto/deactivate-item.response.dto';

@Controller('inventory/items')
export class DeactivateItemController {
  constructor(
    private readonly deactivateItemService: DeactivateItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeactivateItemResponseDto> {
    return this.deactivateItemService.execute(id);
  }
}