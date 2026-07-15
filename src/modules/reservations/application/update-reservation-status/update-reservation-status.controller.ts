import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { UpdateReservationStatusService } from './update-reservation-status.service';
import { UpdateReservationStatusRequestDto } from './dto/update-reservation-status.request.dto';
import { UpdateReservationStatusResponseDto } from './dto/update-reservation-status.response.dto';

@Controller('reservations')
export class UpdateReservationStatusController {
  constructor(
    private readonly service: UpdateReservationStatusService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    request: UpdateReservationStatusRequestDto,

    @CurrentUser()
    user: {
      id: string;
    },
  ): Promise<UpdateReservationStatusResponseDto> {
    return this.service.execute(
      id,
      request,
      user.id,
    );
  }
}