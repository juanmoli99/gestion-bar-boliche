import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DeactivateItemRepository } from './deactivate-item.repository';
import { DeactivateItemResponseDto } from './dto/deactivate-item.response.dto';

@Injectable()
export class DeactivateItemUseCase {
  constructor(
    private readonly repository: DeactivateItemRepository,
  ) {}

  async execute(id: string): Promise<DeactivateItemResponseDto> {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('El ítem no existe.');
    }

    if (!item.activo) {
      throw new ConflictException(
        'El ítem ya está desactivado.',
      );
    }

    return this.repository.deactivate(id);
  }
}