import { Injectable, NotFoundException } from '@nestjs/common';

import { FindItemByIdRepository } from './find-item-by-id.repository';
import { FindItemByIdResponseDto } from './dto/find-item-by-id.response.dto';

@Injectable()
export class FindItemByIdUseCase {
  constructor(
    private readonly repository: FindItemByIdRepository,
  ) {}

  async execute(id: string): Promise<FindItemByIdResponseDto> {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('El ítem no existe.');
    }

    return item;
  }
}