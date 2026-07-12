import { Injectable } from '@nestjs/common';
import { ReactivateUnitUseCase } from './reactivate-unit.use-case';

@Injectable()
export class ReactivateUnitService {
  constructor(
    private readonly reactivateUnitUseCase: ReactivateUnitUseCase,
  ) {}

  async execute(id: string) {
    return this.reactivateUnitUseCase.execute(id);
  }
}