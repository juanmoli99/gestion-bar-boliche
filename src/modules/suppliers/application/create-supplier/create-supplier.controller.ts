import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { CreateSupplierService } from './create-supplier.service';
import { CreateSupplierRequestDto } from './dto/create-supplier.request.dto';
import { CreateSupplierResponseDto } from './dto/create-supplier.response.dto';

@Controller('suppliers')
export class CreateSupplierController {
  constructor(
    private readonly createSupplierService: CreateSupplierService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post()
  async create(
    @Body() request: CreateSupplierRequestDto,
  ): Promise<CreateSupplierResponseDto> {
    return this.createSupplierService.execute(request);
  }
}