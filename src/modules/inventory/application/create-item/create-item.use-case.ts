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
    const nombre = request.nombre.trim();

    const existe = await this.repository.existsByName(
      nombre,
      request.tipo,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe un ítem con ese nombre y tipo.',
      );
    }

    const categoriaExiste = await this.repository.categoriaExiste(
      request.categoriaId,
    );

    if (!categoriaExiste) {
      throw new NotFoundException(
        'La categoría no existe.',
      );
    }

    const unidadExiste = await this.repository.unidadMedidaExiste(
      request.unidadMedidaId,
    );

    if (!unidadExiste) {
      throw new NotFoundException(
        'La unidad de medida no existe.',
      );
    }

    return this.repository.create({
      nombre,
      descripcion: request.descripcion?.trim(),
      tipo: request.tipo,
      categoriaId: request.categoriaId,
      unidadMedidaId: request.unidadMedidaId,
      unidadesPorPack: request.unidadesPorPack,
    });
  }
}