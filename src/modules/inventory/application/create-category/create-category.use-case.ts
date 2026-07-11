import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateCategoryRepository } from './create-category.repository';
import { CreateCategoryRequestDto } from './dto/create-category.request.dto';
import { CreateCategoryResponseDto } from './dto/create-category.response.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly repository: CreateCategoryRepository,
  ) {}

  async execute(
    request: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    const existe = await this.repository.exists(
      request.nombre.trim(),
      request.inventario,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe una categoría con ese nombre en ese inventario.',
      );
    }

    return this.repository.create({
      nombre: request.nombre.trim(),
      descripcion: request.descripcion?.trim(),
      inventario: request.inventario,
    });
  }
}