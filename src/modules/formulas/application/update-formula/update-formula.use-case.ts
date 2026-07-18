import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  UpdateFormulaRepository,
} from './update-formula.repository';

import {
  UpdateFormulaRequestDto,
} from './dto/update-formula.request.dto';

import {
  UpdateFormulaResponseDto,
} from './dto/update-formula.response.dto';

@Injectable()
export class UpdateFormulaUseCase {
  constructor(
    private readonly repository:
      UpdateFormulaRepository,
  ) {}

  async execute(
    formulaId: string,
    request: UpdateFormulaRequestDto,
  ): Promise<UpdateFormulaResponseDto> {
    const formula =
      await this.repository.findById(
        formulaId,
      );

    if (!formula) {
      throw new NotFoundException(
        'La fórmula no existe.',
      );
    }

    if (!formula.activa) {
      throw new BadRequestException(
        'La fórmula está inactiva.',
      );
    }

    const nombre =
      request.nombre.trim();

    const descripcion =
      request.descripcion?.trim() ||
      null;

    const duplicatedItemIds =
      request.items
        .map((item) => item.itemId)
        .filter(
          (
            itemId,
            index,
            items,
          ) =>
            items.indexOf(itemId) !==
            index,
        );

    if (
      duplicatedItemIds.length > 0
    ) {
      throw new BadRequestException(
        'La fórmula contiene ítems repetidos.',
      );
    }

    const nameExists =
      await this.repository.existsByName(
        nombre,
        formulaId,
      );

    if (nameExists) {
      throw new ConflictException(
        'Ya existe otra fórmula con ese nombre.',
      );
    }

    const itemIds =
      request.items.map(
        (item) => item.itemId,
      );

    const activeItems =
      await this.repository.findActiveItems(
        itemIds,
      );

    if (
      activeItems.length !==
      itemIds.length
    ) {
      throw new BadRequestException(
        'Uno o más ítems no existen o están inactivos.',
      );
    }

    const result =
      await this.repository.save({
        formulaId,
        nombre,
        descripcion,

        items: request.items.map(
          (item) => ({
            itemId: item.itemId,

            cantidadPorPersona:
              item.cantidadPorPersona,
          }),
        ),
      });

    if (!result) {
      throw new NotFoundException(
        'La fórmula no existe.',
      );
    }

    return {
      id: result.formula.id,
      nombre:
        result.formula.nombre,

      descripcion:
        result.formula.descripcion,

      activa:
        result.formula.activa,

      versionId:
        result.version.id,

      numeroVersion:
        result.version.numeroVersion,

      actualizadoEn:
        result.formula.actualizadoEn,

      items:
        result.version.items.map(
          (item) => ({
            id: item.id,
            itemId: item.itemId,

            nombreItem:
              item.item.nombre,

            unidadMedida:
              item.item.unidadMedida
                .nombre,

            abreviaturaUnidad:
              item.item.unidadMedida
                .abreviatura,

            cantidadPorPersona:
              Number(
                item.cantidadPorPersona,
              ),
          }),
        ),
    };
  }
}