import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { UpdateSupplierService } from './update-supplier.service';
import { UpdateSupplierRequestDto } from './dto/update-supplier.request.dto';
import { UpdateSupplierResponseDto } from './dto/update-supplier.response.dto';

@Controller('suppliers')
export class UpdateSupplierController {
  constructor(
    private readonly updateSupplierService: UpdateSupplierService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateSupplierRequestDto,
  ): Promise<UpdateSupplierResponseDto> {
    return this.updateSupplierService.execute(
      id,
      request,
    );
  }
}