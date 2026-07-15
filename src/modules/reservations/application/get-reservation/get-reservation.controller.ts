import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { GetReservationService } from './get-reservation.service';
import { GetReservationResponseDto } from './dto/get-reservation.response.dto';

@Controller('reservations')
export class GetReservationController {
  constructor(
    private readonly service: GetReservationService,
  ) {}

  @Get(':id')
  get(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<GetReservationResponseDto> {
    return this.service.execute(id);
  }
}