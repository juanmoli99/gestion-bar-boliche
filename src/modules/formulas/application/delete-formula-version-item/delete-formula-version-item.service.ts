import { Injectable } from '@nestjs/common';

import { DeleteFormulaVersionItemUseCase } from './delete-formula-version-item.use-case';

@Injectable()
export class DeleteFormulaVersionItemService {
  constructor(
    private readonly deleteFormulaVersionItemUseCase: DeleteFormulaVersionItemUseCase,
  ) {}

  async execute(
    versionId: string,
    itemId: string,
  ): Promise<void> {
    return this.deleteFormulaVersionItemUseCase.execute(
      versionId,
      itemId,
    );
  }
}