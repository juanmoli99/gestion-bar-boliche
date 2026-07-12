import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { FindPurchaseByIdService } from './find-purchase-by-id.service';
import { FindPurchaseByIdResponseDto } from './dto/find-purchase-by-id.response.dto';

@Controller('purchases')
export class FindPurchaseByIdController {
  constructor(
    private readonly findPurchaseByIdService: FindPurchaseByIdService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindPurchaseByIdResponseDto> {
    return this.findPurchaseByIdService.execute(
      id,
    );
  }
}