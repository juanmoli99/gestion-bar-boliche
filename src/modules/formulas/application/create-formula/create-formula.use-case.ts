import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateFormulaRepository } from './create-formula.repository';
import { CreateFormulaRequestDto } from './dto/create-formula.request.dto';
import { CreateFormulaResponseDto } from './dto/create-formula.response.dto';

@Injectable()
export class CreateFormulaUseCase {
  constructor(
    private readonly repository: CreateFormulaRepository,
  ) {}

  async execute(
    request: CreateFormulaRequestDto,
  ): Promise<CreateFormulaResponseDto> {
    const nombre = request.nombre.trim();

    const exists =
      await this.repository.existsByName(nombre);

    if (exists) {
      throw new ConflictException(
        'Ya existe una fórmula con ese nombre.',
      );
    }

    return this.repository.create({
      nombre,
      descripcion: request.descripcion?.trim(),
    });
  }
}