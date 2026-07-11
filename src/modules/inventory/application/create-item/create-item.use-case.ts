import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateItemRepository } from './create-item.repository';
import { CreateItemRequestDto } from './dto/create-item.request.dto';
import { CreateItemResponseDto } from './dto/create-item.response.dto';

@Injectable()
export class CreateItemUseCase {
  constructor(
    private readonly repository: CreateItemRepository,
  ) {}

  async execute(
    request: CreateItemRequestDto,
  ): Promise<CreateItemResponseDto> {
    const existe = await this.repository.exists(
      request.nombre.trim(),
      request.tipo,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe un ítem con ese nombre y tipo.',
      );
    }

    const categoriaValida =
      await this.repository.categoriaPerteneceAlInventario(
        request.categoriaId,
        request.inventario,
      );

    if (!categoriaValida) {
      throw new NotFoundException(
        'La categoría no pertenece al inventario seleccionado.',
      );
    }

    return this.repository.create({
      nombre: request.nombre.trim(),
      descripcion: request.descripcion?.trim(),
      inventario: request.inventario,
      tipo: request.tipo,
      categoriaId: request.categoriaId,
      unidadMedidaId: request.unidadMedidaId,
      unidadesPorPack: request.unidadesPorPack,
    });
  }
}