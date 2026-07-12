import { DeactivateUnitUseCase } from './deactivate-unit.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeactivateUnitService {
  constructor(
    private readonly deactivateUnitUseCase: DeactivateUnitUseCase,
  ) {}

  async execute(id: string) {
    return this.deactivateUnitUseCase.execute(id);
  }
}