import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateCategoryRepository } from './update-category.repository';
import { UpdateCategoryRequestDto } from './dto/update-category.request.dto';
import { UpdateCategoryResponseDto } from './dto/update-category.response.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly repository: UpdateCategoryRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateCategoryRequestDto,
  ): Promise<UpdateCategoryResponseDto> {
    const categoria = await this.repository.findById(id);

    if (!categoria) {
      throw new NotFoundException(
        'La categoría no existe.',
      );
    }

    const nombre = request.nombre?.trim() ?? categoria.nombre;
    const inventario =
      request.inventario ?? categoria.inventario;

    const existe = await this.repository.exists(
      nombre,
      inventario,
      id,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe una categoría con ese nombre en ese inventario.',
      );
    }

    return this.repository.update(id, {
      nombre: request.nombre?.trim(),
      descripcion: request.descripcion?.trim(),
      inventario: request.inventario,
    });
  }
}