import { Injectable } from '@nestjs/common';

import { AddFormulaItemUseCase } from './add-formula-item.use-case';
import { AddFormulaItemRequestDto } from './dto/add-formula-item.request.dto';
import { AddFormulaItemResponseDto } from './dto/add-formula-item.response.dto';

@Injectable()
export class AddFormulaItemService {
  constructor(
    private readonly addFormulaItemUseCase: AddFormulaItemUseCase,
  ) {}

  async execute(
    formulaId: string,
    request: AddFormulaItemRequestDto,
  ): Promise<AddFormulaItemResponseDto> {
    return this.addFormulaItemUseCase.execute(
      formulaId,
      request,
    );
  }
}