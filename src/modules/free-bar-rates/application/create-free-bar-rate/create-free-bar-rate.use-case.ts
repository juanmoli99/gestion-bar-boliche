import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CreateFreeBarRateRepository } from './create-free-bar-rate.repository';
import { CreateFreeBarRateRequestDto } from './dto/create-free-bar-rate.request.dto';
import { CreateFreeBarRateResponseDto } from './dto/create-free-bar-rate.response.dto';

@Injectable()
export class CreateFreeBarRateUseCase {
  constructor(
    private readonly repository: CreateFreeBarRateRepository,
  ) {}

  async execute(
    request: CreateFreeBarRateRequestDto,
  ): Promise<CreateFreeBarRateResponseDto> {
    const nombre = request.nombre.trim();

    const existingRate =
      await this.repository.findByName(nombre);

    if (existingRate?.activa) {
      throw new ConflictException(
        'Ya existe una tarifa de barra libre activa con ese nombre.',
      );
    }

    const data = {
      nombre,
      valorPersona: request.valorPersona,
    };

    if (existingRate) {
      return this.repository.reactivate(
        existingRate.id,
        data,
      );
    }

    return this.repository.create(data);
  }
}