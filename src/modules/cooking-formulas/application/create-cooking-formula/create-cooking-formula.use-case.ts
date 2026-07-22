import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateCookingFormulaRepository } from './create-cooking-formula.repository';

import { CreateCookingFormulaRequestDto } from './dto/create-cooking-formula.request.dto';

import { CreateCookingFormulaResponseDto } from './dto/create-cooking-formula.response.dto';

@Injectable()
export class CreateCookingFormulaUseCase {
  constructor(
    private readonly repository:
      CreateCookingFormulaRepository,
  ) {}

  async execute(
    request: CreateCookingFormulaRequestDto,
  ): Promise<CreateCookingFormulaResponseDto> {
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
      ...new Set(
        itemIds,
      ),
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
      await this.repository
        .findActiveItemIds(
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

    const existingFormula =
      await this.repository.findByName(
        nombre,
      );

    if (existingFormula?.activa) {
      throw new ConflictException(
        'Ya existe una fórmula de cocina activa con ese nombre.',
      );
    }

    const data = {
      nombre,
      descripcion,

      items:
        request.items.map(
          (item) => ({
            itemId: item.itemId,
            cantidadPorPersona:
              item.cantidadPorPersona,
          }),
        ),
    };

    if (existingFormula) {
      return this.repository.reactivate(
        existingFormula.id,
        data,
      );
    }

    return this.repository.create(
      data,
    );
  }
}