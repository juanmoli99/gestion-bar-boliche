import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoCompra } from '../../../../generated/prisma/enums';

import { AddPurchaseItemRepository } from './add-purchase-item.repository';
import { AddPurchaseItemRequestDto } from './dto/add-purchase-item.request.dto';
import { AddPurchaseItemResponseDto } from './dto/add-purchase-item.response.dto';

@Injectable()
export class AddPurchaseItemUseCase {
  constructor(
    private readonly repository: AddPurchaseItemRepository,
  ) {}

  async execute(
    compraId: string,
    request: AddPurchaseItemRequestDto,
  ): Promise<AddPurchaseItemResponseDto> {
    const compra = await this.repository.findPurchase(compraId);

    if (!compra) {
      throw new NotFoundException(
        'La compra no existe.',
      );
    }

    if (compra.estado !== EstadoCompra.BORRADOR) {
      throw new BadRequestException(
        'Solo se pueden modificar compras en estado BORRADOR.',
      );
    }

    const item = await this.repository.findItem(
      request.itemId,
    );

    if (!item || !item.activo) {
      throw new NotFoundException(
        'El ítem no existe o está inactivo.',
      );
    }

    return this.repository.create({
      compraId,
      itemId: request.itemId,
      cantidad: request.cantidad,
      precioUnitario: request.precioUnitario,
      porcentajeDescuento:
        request.porcentajeDescuento,
      porcentajeIva:
        request.porcentajeIva,
    });
  }
}