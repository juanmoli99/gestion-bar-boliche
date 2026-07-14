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

import { UpdateReservationService } from './update-reservation.service';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';

@Controller('reservations')
export class UpdateReservationController {
  constructor(
    private readonly service: UpdateReservationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    request: UpdateReservationRequestDto,
  ) {
    return this.service.execute(
      id,
      request,
    );
  }
}