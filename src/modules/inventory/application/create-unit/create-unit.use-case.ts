import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateUnitRepository } from './create-unit.repository';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';
import { CreateUnitResponseDto } from './dto/create-unit.response.dto';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly repository: CreateUnitRepository,
  ) {}

  async execute(
    request: CreateUnitRequestDto,
  ): Promise<CreateUnitResponseDto> {
    const existe = await this.repository.exists(
      request.nombre.trim(),
      request.abreviatura.trim(),
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe una unidad de medida con ese nombre o abreviatura.',
      );
    }

    return this.repository.create({
      nombre: request.nombre.trim(),
      abreviatura: request.abreviatura.trim(),
      permiteDecimal: request.permiteDecimal,
    });
  }
}