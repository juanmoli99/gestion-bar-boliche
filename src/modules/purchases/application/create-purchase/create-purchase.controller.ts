import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { CreatePurchaseService } from './create-purchase.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase.request.dto';
import { CreatePurchaseResponseDto } from './dto/create-purchase.response.dto';

@Controller('purchases')
export class CreatePurchaseController {
  constructor(
    private readonly createPurchaseService: CreatePurchaseService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreatePurchaseRequestDto,
  ): Promise<CreatePurchaseResponseDto> {
    return this.createPurchaseService.execute(
      request,
    );
  }
}