import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoCalculoCompra,
} from '../../../../generated/prisma/enums';

import { DeleteCalculationRepository } from './delete-calculation.repository';
import { DeleteCalculationResponseDto } from './dto/delete-calculation.response.dto';

@Injectable()
export class DeleteCalculationUseCase {
  constructor(
    private readonly repository: DeleteCalculationRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<DeleteCalculationResponseDto> {
    const calculation =
      await this.repository.findById(id);

    if (!calculation) {
      throw new NotFoundException(
        'El cálculo no existe.',
      );
    }

    if (
      calculation.estado ===
      EstadoCalculoCompra.ELIMINADO
    ) {
      throw new BadRequestException(
        'El cálculo ya está eliminado.',
      );
    }

    return this.repository.delete(id);
  }
}