import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateSalaryPositionRepository } from './create-salary-position.repository';
import { CreateSalaryPositionRequestDto } from './dto/create-salary-position.request.dto';
import { CreateSalaryPositionResponseDto } from './dto/create-salary-position.response.dto';

@Injectable()
export class CreateSalaryPositionUseCase {
  constructor(
    private readonly repository: CreateSalaryPositionRepository,
  ) {}

  async execute(
    request: CreateSalaryPositionRequestDto,
  ): Promise<CreateSalaryPositionResponseDto> {
    const nombre = request.nombre.trim();

    const existingPosition =
      await this.repository.findByName(nombre);

    if (existingPosition?.activo) {
      throw new ConflictException(
        'Ya existe un puesto de trabajo activo con ese nombre.',
      );
    }

    const data = {
      nombre,
      valorHora: request.valorHora,
    };

    if (existingPosition) {
      return this.repository.reactivate(
        existingPosition.id,
        data,
      );
    }

    return this.repository.create(data);
  }
}