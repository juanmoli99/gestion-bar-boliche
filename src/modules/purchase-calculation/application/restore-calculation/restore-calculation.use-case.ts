import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoCalculoCompra,
} from '../../../../generated/prisma/enums';

import { RestoreCalculationRepository } from './restore-calculation.repository';
import { RestoreCalculationResponseDto } from './dto/restore-calculation.response.dto';

@Injectable()
export class RestoreCalculationUseCase {
  constructor(
    private readonly repository: RestoreCalculationRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<RestoreCalculationResponseDto> {
    const calculation =
      await this.repository.findById(id);

    if (!calculation) {
      throw new NotFoundException(
        'El cálculo no existe.',
      );
    }

    if (
      calculation.estado !==
      EstadoCalculoCompra.ELIMINADO
    ) {
      throw new BadRequestException(
        'Solo puede restaurarse un cálculo eliminado.',
      );
    }

    return this.repository.restore(id);
  }
}