import {
  Controller,
  Get,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { ListPurchasesService } from './list-purchases.service';
import { ListPurchasesResponseDto } from './dto/list-purchases.response.dto';

@Controller('purchases')
export class ListPurchasesController {
  constructor(
    private readonly listPurchasesService: ListPurchasesService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Get()
  async list(): Promise<ListPurchasesResponseDto[]> {
    return this.listPurchasesService.execute();
  }
}