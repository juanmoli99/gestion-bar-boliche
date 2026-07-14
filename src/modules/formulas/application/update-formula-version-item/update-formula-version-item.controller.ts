import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { UpdateFormulaVersionItemService } from './update-formula-version-item.service';
import { UpdateFormulaVersionItemRequestDto } from './dto/update-formula-version-item.request.dto';
import { UpdateFormulaVersionItemResponseDto } from './dto/update-formula-version-item.response.dto';

@Controller('formulas/versiones')
export class UpdateFormulaVersionItemController {
  constructor(
    private readonly updateFormulaVersionItemService: UpdateFormulaVersionItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':versionId/items/:itemId')
  async update(
    @Param('versionId', ParseUUIDPipe)
    versionId: string,

    @Param('itemId', ParseUUIDPipe)
    itemId: string,

    @Body()
    request: UpdateFormulaVersionItemRequestDto,
  ): Promise<UpdateFormulaVersionItemResponseDto> {
    return this.updateFormulaVersionItemService.execute(
      versionId,
      itemId,
      request,
    );
  }
}