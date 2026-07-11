import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FindStockMovementByIdRepository } from './find-stock-movement-by-id.repository';
import { FindStockMovementByIdResponseDto } from './dto/find-stock-movement-by-id.response.dto';

@Injectable()
export class FindStockMovementByIdUseCase {
  constructor(
    private readonly repository: FindStockMovementByIdRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<FindStockMovementByIdResponseDto> {
    const movement = await this.repository.findById(id);

    if (!movement) {
      throw new NotFoundException(
        'El movimiento de stock no existe.',
      );
    }

    return movement;
  }
}