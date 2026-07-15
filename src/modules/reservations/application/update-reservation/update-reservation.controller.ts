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

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { UpdateReservationService } from './update-reservation.service';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';
import { UpdateReservationResponseDto } from './dto/update-reservation.response.dto';

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

    @CurrentUser()
    user: {
      id: string;
    },
  ): Promise<UpdateReservationResponseDto> {
    return this.service.execute(
      id,
      request,
      user.id,
    );
  }
}