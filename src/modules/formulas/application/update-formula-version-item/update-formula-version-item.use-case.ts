import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateFormulaVersionItemRepository } from './update-formula-version-item.repository';
import { UpdateFormulaVersionItemRequestDto } from './dto/update-formula-version-item.request.dto';
import { UpdateFormulaVersionItemResponseDto } from './dto/update-formula-version-item.response.dto';

@Injectable()
export class UpdateFormulaVersionItemUseCase {
  constructor(
    private readonly repository: UpdateFormulaVersionItemRepository,
  ) {}

  async execute(
    versionId: string,
    itemId: string,
    request: UpdateFormulaVersionItemRequestDto,
  ): Promise<UpdateFormulaVersionItemResponseDto> {
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

    return this.repository.update(
      versionId,
      itemId,
      request.cantidadPorPersona,
    );
  }
}