import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeactivateCategoryRepository } from './deactivate-category.repository';

@Injectable()
export class DeactivateCategoryUseCase {
  constructor(
    private readonly repository: DeactivateCategoryRepository,
  ) {}

  async execute(id: string) {
    const categoria =
      await this.repository.findById(id);

    if (!categoria) {
      throw new NotFoundException(
        'La categoría no existe.',
      );
    }

    return this.repository.deactivate(id);
  }
}