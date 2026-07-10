import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateItemRepository } from './update-item.repository';
import { UpdateItemRequestDto } from './dto/update-item.request.dto';
import { UpdateItemResponseDto } from './dto/update-item.response.dto';

@Injectable()
export class UpdateItemUseCase {
  constructor(
    private readonly repository: UpdateItemRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateItemRequestDto,
  ): Promise<UpdateItemResponseDto> {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('El ítem no existe.');
    }

    const nombre = request.nombre?.trim() ?? item.nombre;
    const tipo = request.tipo ?? item.tipo;

    const existe = await this.repository.existsByName(
      nombre,
      tipo,
      id,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe un ítem con ese nombre y tipo.',
      );
    }

    if (request.categoriaId) {
      const categoriaExiste = await this.repository.categoriaExiste(
        request.categoriaId,
      );

      if (!categoriaExiste) {
        throw new NotFoundException(
          'La categoría no existe.',
        );
      }
    }

    if (request.unidadMedidaId) {
      const unidadExiste = await this.repository.unidadMedidaExiste(
        request.unidadMedidaId,
      );

      if (!unidadExiste) {
        throw new NotFoundException(
          'La unidad de medida no existe.',
        );
      }
    }

    return this.repository.update(id, {
      nombre: request.nombre?.trim(),
      descripcion: request.descripcion?.trim(),
      tipo: request.tipo,
      categoriaId: request.categoriaId,
      unidadMedidaId: request.unidadMedidaId,
      unidadesPorPack: request.unidadesPorPack,
    });
  }
}