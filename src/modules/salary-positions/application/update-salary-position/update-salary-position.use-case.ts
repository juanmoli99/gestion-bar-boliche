import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateSalaryPositionRepository } from './update-salary-position.repository';
import { UpdateSalaryPositionRequestDto } from './dto/update-salary-position.request.dto';
import { UpdateSalaryPositionResponseDto } from './dto/update-salary-position.response.dto';

@Injectable()
export class UpdateSalaryPositionUseCase {
  constructor(
    private readonly repository: UpdateSalaryPositionRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateSalaryPositionRequestDto,
  ): Promise<UpdateSalaryPositionResponseDto> {
    const puesto =
      await this.repository.findById(id);

    if (!puesto) {
      throw new NotFoundException(
        'El puesto de trabajo no existe.',
      );
    }

    const nombre =
      request.nombre?.trim() ??
      puesto.nombre;

    const existe =
      await this.repository.exists(
        nombre,
        id,
      );

    if (existe) {
      throw new ConflictException(
        'Ya existe un puesto de trabajo con ese nombre.',
      );
    }

    return this.repository.update(id, {
      nombre:
        request.nombre?.trim(),
      valorHora:
        request.valorHora,
    });
  }
}