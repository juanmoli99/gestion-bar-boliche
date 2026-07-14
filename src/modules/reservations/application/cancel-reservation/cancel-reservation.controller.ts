import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CancelReservationService } from './cancel-reservation.service';
import { CancelReservationRequestDto } from './dto/cancel-reservation.request.dto';

@Controller('reservations')
export class CancelReservationController {
  constructor(
    private readonly service: CancelReservationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/cancel')
  cancel(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    request: CancelReservationRequestDto,
  ) {
    return this.service.execute(
      id,
      request,
    );
  }
}