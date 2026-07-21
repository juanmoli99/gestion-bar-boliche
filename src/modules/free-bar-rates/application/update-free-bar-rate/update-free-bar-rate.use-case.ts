import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateFreeBarRateRepository } from './update-free-bar-rate.repository';
import { UpdateFreeBarRateRequestDto } from './dto/update-free-bar-rate.request.dto';
import { UpdateFreeBarRateResponseDto } from './dto/update-free-bar-rate.response.dto';

@Injectable()
export class UpdateFreeBarRateUseCase {
  constructor(
    private readonly repository: UpdateFreeBarRateRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateFreeBarRateRequestDto,
  ): Promise<UpdateFreeBarRateResponseDto> {
    const tarifa =
      await this.repository.findById(id);

    if (!tarifa) {
      throw new NotFoundException(
        'La tarifa de barra libre no existe.',
      );
    }

    const nombre =
      request.nombre?.trim() ??
      tarifa.nombre;

    const existe =
      await this.repository.exists(
        nombre,
        id,
      );

    if (existe) {
      throw new ConflictException(
        'Ya existe una tarifa de barra libre con ese nombre.',
      );
    }

    return this.repository.update(id, {
      nombre:
        request.nombre?.trim(),
      valorPersona:
        request.valorPersona,
    });
  }
}