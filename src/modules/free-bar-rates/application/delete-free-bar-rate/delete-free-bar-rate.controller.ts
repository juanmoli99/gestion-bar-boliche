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

import { DeleteFreeBarRateService } from './delete-free-bar-rate.service';

@Controller('free-bar-rates')
export class DeleteFreeBarRateController {
  constructor(
    private readonly deleteFreeBarRateService: DeleteFreeBarRateService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<void> {
    return this.deleteFreeBarRateService.execute(
      id,
    );
  }
}