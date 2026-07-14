import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DeleteFormulaVersionItemRepository } from './delete-formula-version-item.repository';

@Injectable()
export class DeleteFormulaVersionItemUseCase {
  constructor(
    private readonly repository: DeleteFormulaVersionItemRepository,
  ) {}

  async execute(
    versionId: string,
    itemId: string,
  ): Promise<void> {
    const version =
      await this.repository.findVersion(versionId);

    if (!version) {
      throw new NotFoundException(
        'La versión no existe.',
      );
    }

    if (!version.activa) {
      throw new BadRequestException(
        'Solo puede modificarse la versión activa.',
      );
    }

    const item =
      await this.repository.findItem(
        versionId,
        itemId,
      );

    if (!item) {
      throw new NotFoundException(
        'El ítem no pertenece a esta versión.',
      );
    }

    await this.repository.delete(
      versionId,
      itemId,
    );
  }
}