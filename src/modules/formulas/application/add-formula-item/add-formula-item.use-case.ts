import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AddFormulaItemRepository } from './add-formula-item.repository';
import { AddFormulaItemRequestDto } from './dto/add-formula-item.request.dto';
import { AddFormulaItemResponseDto } from './dto/add-formula-item.response.dto';

@Injectable()
export class AddFormulaItemUseCase {
  constructor(
    private readonly repository: AddFormulaItemRepository,
  ) {}

  async execute(
    formulaId: string,
    request: AddFormulaItemRequestDto,
  ): Promise<AddFormulaItemResponseDto> {
    const version =
      await this.repository.findActiveVersion(formulaId);

    if (!version) {
      throw new NotFoundException(
        'La fórmula no existe o no tiene una versión activa.',
      );
    }

    const item = await this.repository.itemExists(
      request.itemId,
    );

    if (!item) {
      throw new NotFoundException(
        'El ítem no existe.',
      );
    }

    if (!item.activo) {
      throw new BadRequestException(
        'El ítem está inactivo.',
      );
    }

    const alreadyAdded =
      await this.repository.itemAlreadyAdded(
        version.id,
        request.itemId,
      );

    if (alreadyAdded) {
      throw new ConflictException(
        'El ítem ya está agregado a la versión activa de esta fórmula.',
      );
    }

    return this.repository.create({
      versionId: version.id,
      itemId: request.itemId,
      cantidadPorPersona: request.cantidadPorPersona,
    });
  }
}