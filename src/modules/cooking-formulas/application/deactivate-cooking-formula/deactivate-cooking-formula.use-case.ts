import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  DeactivateCookingFormulaRepository,
} from './deactivate-cooking-formula.repository';

import {
  DeactivateCookingFormulaResponseDto,
} from './dto/deactivate-cooking-formula.response.dto';

@Injectable()
export class DeactivateCookingFormulaUseCase {
  constructor(
    private readonly repository:
      DeactivateCookingFormulaRepository,
  ) {}

  async execute(
    formulaId: string,
  ): Promise<DeactivateCookingFormulaResponseDto> {
    const formula =
      await this.repository.findById(
        formulaId,
      );

    if (!formula) {
      throw new NotFoundException(
        'La fórmula de cocina no existe.',
      );
    }

    if (!formula.activa) {
      throw new ConflictException(
        'La fórmula de cocina ya está desactivada.',
      );
    }

    return this.repository.deactivate(
      formulaId,
    );
  }
}