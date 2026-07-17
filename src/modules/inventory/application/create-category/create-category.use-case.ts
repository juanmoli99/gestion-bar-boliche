import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import {
  CreateCategoryRepository,
} from './create-category.repository';

import {
  CreateCategoryRequestDto,
} from './dto/create-category.request.dto';

import {
  CreateCategoryResponseDto,
} from './dto/create-category.response.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly repository:
      CreateCategoryRepository,
  ) {}

  async execute(
    request: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    const nombre =
      request.nombre.trim();

    const descripcion =
      request.descripcion
        ?.trim() ||
      undefined;

    const existingCategory =
      await this.repository
        .findByNameAndInventory(
          nombre,
          request.inventario,
        );

    if (
      existingCategory?.activa
    ) {
      throw new ConflictException(
        'Ya existe una categoría activa con ese nombre en esa zona.',
      );
    }

    const data = {
      nombre,
      descripcion,
      inventario:
        request.inventario,
    };

    if (existingCategory) {
      return this.repository.reactivate(
        existingCategory.id,
        data,
      );
    }

    return this.repository.create(
      data,
    );
  }
}