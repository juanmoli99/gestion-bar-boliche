import { Injectable } from '@nestjs/common';
import { ReactivateCategoryUseCase } from './reactivate-category.use-case';

@Injectable()
export class ReactivateCategoryService {
  constructor(
    private readonly reactivateCategoryUseCase: ReactivateCategoryUseCase,
  ) {}

  async execute(id: string) {
    return this.reactivateCategoryUseCase.execute(id);
  }
}