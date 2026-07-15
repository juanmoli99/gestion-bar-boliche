import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import { Roles } from '../../../../shared/decorators/roles.decorator';

import { DeleteCalculationService } from './delete-calculation.service';
import { DeleteCalculationResponseDto } from './dto/delete-calculation.response.dto';

@Controller('purchase-calculation')
export class DeleteCalculationController {
  constructor(
    private readonly service: DeleteCalculationService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Delete(':id')
  delete(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<DeleteCalculationResponseDto> {
    return this.service.execute(id);
  }
}