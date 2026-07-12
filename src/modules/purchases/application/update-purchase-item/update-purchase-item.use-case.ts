import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoCompra } from '../../../../generated/prisma/enums';

import { UpdatePurchaseItemRepository } from './update-purchase-item.repository';
import { UpdatePurchaseItemRequestDto } from './dto/update-purchase-item.request.dto';
import { UpdatePurchaseItemResponseDto } from './dto/update-purchase-item.response.dto';

@Injectable()
export class UpdatePurchaseItemUseCase {
  constructor(
    private readonly repository: UpdatePurchaseItemRepository,
  ) {}

  async execute(
    id: string,
    request: UpdatePurchaseItemRequestDto,
  ): Promise<UpdatePurchaseItemResponseDto> {
    const detail = await this.repository.findDetail(id);

    if (!detail) {
      throw new NotFoundException(
        'El detalle de compra no existe.',
      );
    }

    if (detail.compra.estado !== EstadoCompra.BORRADOR) {
      throw new BadRequestException(
        'Solo se pueden modificar compras en estado BORRADOR.',
      );
    }

    return this.repository.update(id, {
      cantidad: request.cantidad,
      precioUnitario: request.precioUnitario,
      porcentajeDescuento:
        request.porcentajeDescuento,
      porcentajeIva:
        request.porcentajeIva,
    });
  }
}