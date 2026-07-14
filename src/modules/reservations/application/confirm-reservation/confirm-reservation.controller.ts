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

import { ConfirmReservationService } from './confirm-reservation.service';

@Controller('reservations')
export class ConfirmReservationController {
  constructor(
    private readonly service: ConfirmReservationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/confirm')
  confirm(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.service.execute(id);
  }
}