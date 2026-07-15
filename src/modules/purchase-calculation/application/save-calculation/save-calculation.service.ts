import { Injectable } from '@nestjs/common';

import { CalculationResult } from '../../domain/purchase-calculation.types';
import { SaveCalculationRepository } from './save-calculation.repository';

interface SaveCalculationParams {
  calculation: CalculationResult;
  usuarioId: string;
  observaciones?: string;
}

@Injectable()
export class SaveCalculationService {
  constructor(
    private readonly repository: SaveCalculationRepository,
  ) {}

  async execute(
    params: SaveCalculationParams,
  ) {
    return this.repository.save({
      calculation: params.calculation,
      usuarioId: params.usuarioId,
      observaciones:
        params.observaciones,
    });
  }
}