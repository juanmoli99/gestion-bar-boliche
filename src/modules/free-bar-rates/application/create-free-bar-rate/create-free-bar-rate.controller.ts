import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateFreeBarRateService } from './create-free-bar-rate.service';
import { CreateFreeBarRateRequestDto } from './dto/create-free-bar-rate.request.dto';
import { CreateFreeBarRateResponseDto } from './dto/create-free-bar-rate.response.dto';

@Controller('free-bar-rates')
export class CreateFreeBarRateController {
  constructor(
    private readonly createFreeBarRateService: CreateFreeBarRateService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateFreeBarRateRequestDto,
  ): Promise<CreateFreeBarRateResponseDto> {
    return this.createFreeBarRateService.execute(request);
  }
}