import { Injectable } from '@nestjs/common';

import { UpdateFormulaVersionItemUseCase } from './update-formula-version-item.use-case';
import { UpdateFormulaVersionItemRequestDto } from './dto/update-formula-version-item.request.dto';
import { UpdateFormulaVersionItemResponseDto } from './dto/update-formula-version-item.response.dto';

@Injectable()
export class UpdateFormulaVersionItemService {
  constructor(
    private readonly updateFormulaVersionItemUseCase: UpdateFormulaVersionItemUseCase,
  ) {}

  async execute(
    versionId: string,
    itemId: string,
    request: UpdateFormulaVersionItemRequestDto,
  ): Promise<UpdateFormulaVersionItemResponseDto> {
    return this.updateFormulaVersionItemUseCase.execute(
      versionId,
      itemId,
      request,
    );
  }
}