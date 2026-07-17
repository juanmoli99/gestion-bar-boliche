import {
  Body,
  Controller,
  Patch,
} from '@nestjs/common';

import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolUsuario } from '../../../../generated/prisma/enums';

import { UpdateValuesService } from './update-values.service';
import { UpdateValuesRequestDto } from './dto/update-values.request.dto';

@Controller('values')
export class UpdateValuesController {
  constructor(
    private readonly service: UpdateValuesService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch()
  update(
    @Body()
    request: UpdateValuesRequestDto,
  ) {
    return this.service.execute(request);
  }
}