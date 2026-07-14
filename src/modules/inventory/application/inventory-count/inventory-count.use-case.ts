import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TipoMovimientoStock } from '../../../../generated/prisma/enums';

import { InventoryCountRepository } from './inventory-count.repository';
import { InventoryCountRequestDto } from './dto/inventory-count.request.dto';
import { InventoryCountResponseDto } from './dto/inventory-count.response.dto';

@Injectable()
export class InventoryCountUseCase {
  constructor(
    private readonly repository: InventoryCountRepository,
  ) {}

  async execute(
    stockId: string,
    usuarioId: string,
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    const stock =
      await this.repository.findStock(stockId);

    if (!stock) {
      throw new NotFoundException(
        'El stock no existe.',
      );
    }

    const cantidadAnterior =
      Number(stock.cantidadActual);

    const cantidadContada =
      request.cantidadContada;

    const diferencia =
      cantidadContada - cantidadAnterior;

    await this.repository.updateStock(
      stockId,
      cantidadContada,
    );

    await this.repository.createMovement({
      itemId: stock.itemId,
      inventario: stock.inventario,
      cantidad: Math.abs(diferencia),
      cantidadAnterior,
      cantidadPosterior: cantidadContada,
      usuarioId,
      motivo: 'Conteo físico',
      tipo:
        diferencia >= 0
          ? TipoMovimientoStock.ENTRADA
          : TipoMovimientoStock.SALIDA,
    });

    return {
      stockId: stock.id,
      itemId: stock.itemId,
      cantidadAnterior: stock.cantidadActual,
      cantidadContada,
      diferencia,
      cantidadActual: cantidadContada,
    };
  }
}