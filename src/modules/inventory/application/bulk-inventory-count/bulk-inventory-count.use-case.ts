import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  BulkInventoryCountRepository,
} from './bulk-inventory-count.repository';

import {
  BulkInventoryCountRequestDto,
} from './dto/bulk-inventory-count.request.dto';

import {
  BulkInventoryCountResponseDto,
} from './dto/bulk-inventory-count.response.dto';

@Injectable()
export class BulkInventoryCountUseCase {
  constructor(
    private readonly repository:
      BulkInventoryCountRepository,
  ) {}

  async execute(
    usuarioId: string,
    request: BulkInventoryCountRequestDto,
  ): Promise<BulkInventoryCountResponseDto> {
    const stockIds =
      request.items.map(
        (item) =>
          item.stockId,
      );

    const uniqueStockIds =
      new Set(stockIds);

    if (
      uniqueStockIds.size !==
      stockIds.length
    ) {
      throw new BadRequestException(
        'El conteo contiene ítems repetidos.',
      );
    }

    const result =
      await this.repository.countAll(
        request.items,
        usuarioId,
      );

    if (
      result.missingStockIds.length > 0
    ) {
      throw new NotFoundException(
        'Uno o más registros de stock no existen.',
      );
    }

    const itemsActualizados =
      result.items.filter(
        (item) =>
          item.actualizado,
      ).length;

    return {
      totalItems:
        result.items.length,

      itemsActualizados,

      movimientosCreados:
        itemsActualizados,

      items:
        result.items,
    };
  }
}