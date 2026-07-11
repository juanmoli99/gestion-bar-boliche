import { Injectable, NotFoundException } from '@nestjs/common';

import { FindStockByIdRepository } from './find-stock-by-id.repository';
import { FindStockByIdResponseDto } from './dto/find-stock-by-id.response.dto';

@Injectable()
export class FindStockByIdUseCase {
  constructor(
    private readonly repository: FindStockByIdRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<FindStockByIdResponseDto> {
    const stock = await this.repository.findById(id);

    if (!stock) {
      throw new NotFoundException(
        'El stock no existe.',
      );
    }

    return stock;
  }
}