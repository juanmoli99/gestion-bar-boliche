import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ListFormulaItemsService } from './list-formula-items.service';
import { ListFormulaItemsResponseDto } from './dto/list-formula-items.response.dto';

@Controller('formulas')
export class ListFormulaItemsController {
  constructor(
    private readonly listFormulaItemsService: ListFormulaItemsService,
  ) {}

  @Get(':id/items')
  async list(
    @Param('id', new ParseUUIDPipe())
    formulaId: string,
  ): Promise<ListFormulaItemsResponseDto[]> {
    return this.listFormulaItemsService.execute(
      formulaId,
    );
  }
}