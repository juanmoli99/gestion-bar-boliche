import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateFormulaVersionRepository } from './create-formula-version.repository';
import { CreateFormulaVersionResponseDto } from './dto/create-formula-version.response.dto';

@Injectable()
export class CreateFormulaVersionUseCase {
  constructor(
    private readonly repository: CreateFormulaVersionRepository,
  ) {}

  async execute(
    formulaId: string,
  ): Promise<CreateFormulaVersionResponseDto> {
    const version =
      await this.repository.create(formulaId);

    if (!version) {
      throw new NotFoundException(
        'La fórmula no existe.',
      );
    }

    return version;
  }
}