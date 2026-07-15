import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CreateReservationService } from './create-reservation.service';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Controller('reservations')
export class CreateReservationController {
  constructor(
    private readonly createReservationService: CreateReservationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body()
    request: CreateReservationRequestDto,

    @CurrentUser()
    user: {
      id: string;
    },
  ): Promise<CreateReservationResponseDto> {
    return this.createReservationService.execute(
      request,
      user.id,
    );
  }
}