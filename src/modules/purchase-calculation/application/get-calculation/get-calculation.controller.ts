import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { GetCalculationService } from './get-calculation.service';

@Controller('purchase-calculation')
export class GetCalculationController {
  constructor(
    private readonly service: GetCalculationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Get(':id')
  get(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    id: string,
  ) {
    return this.service.execute(
      id,
    );
  }
}