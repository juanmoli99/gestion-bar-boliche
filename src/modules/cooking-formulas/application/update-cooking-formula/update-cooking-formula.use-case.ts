import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  UpdateCookingFormulaRepository,
} from './update-cooking-formula.repository';

import {
  UpdateCookingFormulaRequestDto,
} from './dto/update-cooking-formula.request.dto';

import {
  UpdateCookingFormulaResponseDto,
} from './dto/update-cooking-formula.response.dto';

@Injectable()
export class UpdateCookingFormulaUseCase {
  constructor(
    private readonly repository:
      UpdateCookingFormulaRepository,
  ) {}

  async execute(
    formulaId: string,
    request: UpdateCookingFormulaRequestDto,
  ): Promise<UpdateCookingFormulaResponseDto> {
    const formula =
      await this.repository.findById(
        formulaId,
      );

    if (!formula) {
      throw new NotFoundException(
        'La fórmula de cocina no existe.',
      );
    }

    if (!formula.activa) {
      throw new BadRequestException(
        'La fórmula de cocina está inactiva.',
      );
    }

    const nombre =
      request.nombre.trim();

    const descripcion =
      request.descripcion?.trim() ||
      undefined;

    if (!nombre) {
      throw new BadRequestException(
        'El nombre de la fórmula de cocina es obligatorio.',
      );
    }

    const itemIds =
      request.items.map(
        (item) =>
          item.itemId,
      );

    const uniqueItemIds = [
      ...new Set(itemIds),
    ];

    if (
      uniqueItemIds.length !==
      itemIds.length
    ) {
      throw new BadRequestException(
        'No se puede agregar el mismo ítem más de una vez a la fórmula de cocina.',
      );
    }

    const activeItems =
      await this.repository.findActiveItemIds(
        uniqueItemIds,
      );

    if (
      activeItems.length !==
      uniqueItemIds.length
    ) {
      throw new BadRequestException(
        'Uno o más ítems no existen o están inactivos.',
      );
    }

    const nameExists =
      await this.repository.existsByName(
        nombre,
        formulaId,
      );

    if (nameExists) {
      throw new ConflictException(
        'Ya existe otra fórmula de cocina activa con ese nombre.',
      );
    }

    const result =
      await this.repository.save({
        formulaId,
        nombre,
        descripcion,

        items:
          request.items.map(
            (item) => ({
              itemId:
                item.itemId,

              cantidadPorPersona:
                item.cantidadPorPersona,
            }),
          ),
      });

    if (!result) {
      throw new NotFoundException(
        'La fórmula de cocina no existe.',
      );
    }

    return result;
  }
}