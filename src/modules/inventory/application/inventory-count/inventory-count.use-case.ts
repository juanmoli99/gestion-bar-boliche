import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InventoryCountRepository,
} from './inventory-count.repository';

import {
  InventoryCountRequestDto,
} from './dto/inventory-count.request.dto';

import {
  InventoryCountResponseDto,
} from './dto/inventory-count.response.dto';

@Injectable()
export class InventoryCountUseCase {
  constructor(
    private readonly repository:
      InventoryCountRepository,
  ) {}

  async execute(
    stockId: string,
    usuarioId: string,
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    const result =
      await this.repository.count(
        stockId,
        request.cantidadContada,
        usuarioId,
      );

    if (!result) {
      throw new NotFoundException(
        'El stock no existe.',
      );
    }

    return result;
  }
}