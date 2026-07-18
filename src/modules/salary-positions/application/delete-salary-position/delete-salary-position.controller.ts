import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { DeleteSalaryPositionService } from './delete-salary-position.service';

@Controller('salary-positions')
export class DeleteSalaryPositionController {
  constructor(
    private readonly deleteSalaryPositionService: DeleteSalaryPositionService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ): Promise<void> {
    return this.deleteSalaryPositionService.execute(
      id,
    );
  }
}