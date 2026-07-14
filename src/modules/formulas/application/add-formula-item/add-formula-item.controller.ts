import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';
import { Roles } from '../../../../shared/decorators/roles.decorator';

import { AddFormulaItemService } from './add-formula-item.service';
import { AddFormulaItemRequestDto } from './dto/add-formula-item.request.dto';
import { AddFormulaItemResponseDto } from './dto/add-formula-item.response.dto';

@Controller('formulas')
export class AddFormulaItemController {
  constructor(
    private readonly addFormulaItemService: AddFormulaItemService,
  ) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Post(':id/items')
  async addItem(
    @Param('id', new ParseUUIDPipe())
    formulaId: string,
    @Body()
    request: AddFormulaItemRequestDto,
  ): Promise<AddFormulaItemResponseDto> {
    return this.addFormulaItemService.execute(
      formulaId,
      request,
    );
  }
}