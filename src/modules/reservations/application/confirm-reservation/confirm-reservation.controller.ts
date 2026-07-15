import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { ConfirmReservationService } from './confirm-reservation.service';
import { ConfirmReservationResponseDto } from './dto/confirm-reservation.response.dto';

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

    @CurrentUser()
    user: {
      id: string;
    },
  ): Promise<ConfirmReservationResponseDto> {
    return this.service.execute(
      id,
      user.id,
    );
  }
}