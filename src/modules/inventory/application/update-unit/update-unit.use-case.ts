import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUnitRepository } from './update-unit.repository';
import { UpdateUnitRequestDto } from './dto/update-unit.request.dto';
import { UpdateUnitResponseDto } from './dto/update-unit.response.dto';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    private readonly repository: UpdateUnitRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateUnitRequestDto,
  ): Promise<UpdateUnitResponseDto> {
    const unidad = await this.repository.findById(id);

    if (!unidad) {
      throw new NotFoundException(
        'La unidad de medida no existe.',
      );
    }

    const nombre = request.nombre?.trim() ?? unidad.nombre;
    const abreviatura =
      request.abreviatura?.trim() ?? unidad.abreviatura;

    const existe = await this.repository.exists(
      nombre,
      abreviatura,
      id,
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe una unidad de medida con ese nombre o abreviatura.',
      );
    }

    return this.repository.update(id, {
      nombre: request.nombre?.trim(),
      abreviatura: request.abreviatura?.trim(),
      permiteDecimal: request.permiteDecimal,
    });
  }
}