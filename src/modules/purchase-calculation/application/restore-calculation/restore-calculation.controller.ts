import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { RestoreCalculationService } from './restore-calculation.service';
import { RestoreCalculationResponseDto } from './dto/restore-calculation.response.dto';

@Controller('purchase-calculation')
export class RestoreCalculationController {
  constructor(
    private readonly service: RestoreCalculationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/restore')
  restore(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<RestoreCalculationResponseDto> {
    return this.service.execute(id);
  }
}