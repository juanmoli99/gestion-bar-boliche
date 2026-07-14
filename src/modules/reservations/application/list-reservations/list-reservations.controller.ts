import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { ListReservationsService } from './list-reservations.service';
import { ListReservationsRequestDto } from './dto/list-reservations.request.dto';

@Controller('reservations')
export class ListReservationsController {
  constructor(
    private readonly service: ListReservationsService,
  ) {}

  @Get()
  list(
    @Query()
    request: ListReservationsRequestDto,
  ) {
    return this.service.execute(
      request,
    );
  }
}