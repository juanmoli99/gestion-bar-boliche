import { Injectable } from '@nestjs/common';
import { DeactivateCategoryUseCase } from './deactivate-category.use-case';

@Injectable()
export class DeactivateCategoryService {
  constructor(
    private readonly deactivateCategoryUseCase: DeactivateCategoryUseCase,
  ) {}

  async execute(id: string) {
    return this.deactivateCategoryUseCase.execute(id);
  }
}