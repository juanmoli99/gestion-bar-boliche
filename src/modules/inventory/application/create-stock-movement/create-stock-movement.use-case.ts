import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  TipoMovimientoStock,
} from '../../../../generated/prisma/enums';

import { CreateStockMovementRepository } from './create-stock-movement.repository';
import { CreateStockMovementRequestDto } from './dto/create-stock-movement.request.dto';
import { CreateStockMovementResponseDto } from './dto/create-stock-movement.response.dto';

@Injectable()
export class CreateStockMovementUseCase {
  constructor(
    private readonly repository: CreateStockMovementRepository,
  ) {}

  async execute(
    request: CreateStockMovementRequestDto,
    usuarioId?: string,
  ): Promise<CreateStockMovementResponseDto> {
    const stock = await this.repository.findStock(
      request.itemId,
      request.inventario,
    );

    if (!stock) {
      throw new NotFoundException(
        'El stock no existe.',
      );
    }

    const cantidadAnterior = Number(
      stock.cantidadActual,
    );

    let cantidadPosterior = cantidadAnterior;

    switch (request.tipo) {
      case TipoMovimientoStock.ENTRADA:
      case TipoMovimientoStock.AJUSTE_POSITIVO:
        cantidadPosterior += request.cantidad;
        break;

      case TipoMovimientoStock.SALIDA:
      case TipoMovimientoStock.AJUSTE_NEGATIVO:
        cantidadPosterior -= request.cantidad;

        if (cantidadPosterior < 0) {
          throw new BadRequestException(
            'Stock insuficiente.',
          );
        }

        break;
    }

    await this.repository.updateStock(
      stock.id,
      cantidadPosterior,
    );

    return this.repository.createMovement({
      itemId: request.itemId,
      inventario: request.inventario,
      tipo: request.tipo,
      cantidad: request.cantidad,
      cantidadAnterior,
      cantidadPosterior,
      motivo: request.motivo,
      usuarioId,
    });
  }
}