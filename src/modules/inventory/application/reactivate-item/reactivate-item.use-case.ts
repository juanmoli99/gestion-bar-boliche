import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ReactivateItemRepository } from './reactivate-item.repository';
import { ReactivateItemResponseDto } from './dto/reactivate-item.response.dto';

@Injectable()
export class ReactivateItemUseCase {
  constructor(
    private readonly repository: ReactivateItemRepository,
  ) {}

  async execute(id: string): Promise<ReactivateItemResponseDto> {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('El ítem no existe.');
    }

    if (item.activo) {
      throw new ConflictException(
        'El ítem ya está activo.',
      );
    }

    return this.repository.reactivate(id);
  }
}