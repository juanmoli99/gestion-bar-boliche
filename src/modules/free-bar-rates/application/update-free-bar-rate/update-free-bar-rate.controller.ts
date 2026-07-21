import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateFreeBarRateService } from './update-free-bar-rate.service';
import { UpdateFreeBarRateRequestDto } from './dto/update-free-bar-rate.request.dto';
import { UpdateFreeBarRateResponseDto } from './dto/update-free-bar-rate.response.dto';

@Controller('free-bar-rates')
export class UpdateFreeBarRateController {
  constructor(
    private readonly updateFreeBarRateService: UpdateFreeBarRateService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateFreeBarRateRequestDto,
  ): Promise<UpdateFreeBarRateResponseDto> {
    return this.updateFreeBarRateService.execute(
      id,
      request,
    );
  }
}
