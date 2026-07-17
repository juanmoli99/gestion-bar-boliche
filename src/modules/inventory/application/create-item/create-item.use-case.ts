import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CreateItemRepository,
} from './create-item.repository';

import {
  CreateItemRequestDto,
} from './dto/create-item.request.dto';

import {
  CreateItemResponseDto,
} from './dto/create-item.response.dto';

@Injectable()
export class CreateItemUseCase {
  constructor(
    private readonly repository:
      CreateItemRepository,
  ) {}

  async execute(
    request: CreateItemRequestDto,
  ): Promise<CreateItemResponseDto> {
    const nombre =
      request.nombre.trim();

    const existingItem =
      await this.repository
        .findByNameAndType(
          nombre,
          request.tipo,
        );

    if (
      existingItem?.activo
    ) {
      throw new ConflictException(
        'Ya existe un ítem activo con ese nombre y tipo.',
      );
    }

    const categoriaValida =
      await this.repository
        .categoriaPerteneceAlInventario(
          request.categoriaId,
          request.inventario,
        );

    if (!categoriaValida) {
      throw new NotFoundException(
        'La categoría no pertenece al inventario seleccionado.',
      );
    }

    const data = {
      nombre,

      descripcion:
        request.descripcion
          ?.trim() ||
        undefined,

      inventario:
        request.inventario,

      tipo:
        request.tipo,

      categoriaId:
        request.categoriaId,

      unidadMedidaId:
        request.unidadMedidaId,

      unidadesPorPack:
        request.unidadesPorPack,

      cantidadActual:
        request.cantidadActual,

      cantidadMinima:
        request.cantidadMinima,
    };

    if (existingItem) {
      return this.repository.reactivate(
        existingItem.id,
        data,
      );
    }

    return this.repository.create(
      data,
    );
  }
}