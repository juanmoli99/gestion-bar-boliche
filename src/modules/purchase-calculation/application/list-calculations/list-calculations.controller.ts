import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { ListCalculationsService } from './list-calculations.service';

import { ListCalculationsRequestDto } from './dto/list-calculations.request.dto';

@Controller('purchase-calculation')
export class ListCalculationsController {
  constructor(
    private readonly service: ListCalculationsService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Get('history')
  list(
    @Query()
    request: ListCalculationsRequestDto,
  ) {
    return this.service.execute(
      request,
    );
  }
}