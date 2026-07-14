import { Injectable } from '@nestjs/common';

import { ListFormulaItemsUseCase } from './list-formula-items.use-case';
import { ListFormulaItemsResponseDto } from './dto/list-formula-items.response.dto';

@Injectable()
export class ListFormulaItemsService {
  constructor(
    private readonly listFormulaItemsUseCase: ListFormulaItemsUseCase,
  ) {}

  async execute(
    formulaId: string,
  ): Promise<ListFormulaItemsResponseDto[]> {
    return this.listFormulaItemsUseCase.execute(
      formulaId,
    );
  }
}