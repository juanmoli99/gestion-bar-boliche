import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReactivateCategoryRepository } from './reactivate-category.repository';

@Injectable()
export class ReactivateCategoryUseCase {
  constructor(
    private readonly repository: ReactivateCategoryRepository,
  ) {}

  async execute(id: string) {
    const categoria =
      await this.repository.findById(id);

    if (!categoria) {
      throw new NotFoundException(
        'La categoría no existe.',
      );
    }

    return this.repository.reactivate(id);
  }
}