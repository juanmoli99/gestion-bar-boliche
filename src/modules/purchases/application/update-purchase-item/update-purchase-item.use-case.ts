import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoCompra } from '../../../../generated/prisma/enums';

import { RecalculatePurchaseTotalsService } from '../recalculate-purchase-totals/recalculate-purchase-totals.service';
import { UpdatePurchaseItemRepository } from './update-purchase-item.repository';
import { UpdatePurchaseItemRequestDto } from './dto/update-purchase-item.request.dto';
import { UpdatePurchaseItemResponseDto } from './dto/update-purchase-item.response.dto';

@Injectable()
export class UpdatePurchaseItemUseCase {
  constructor(
    private readonly repository: UpdatePurchaseItemRepository,
    private readonly recalculatePurchaseTotalsService: RecalculatePurchaseTotalsService,
  ) {}

  async execute(
    id: string,
    request: UpdatePurchaseItemRequestDto,
  ): Promise<UpdatePurchaseItemResponseDto> {
    const existingDetail = await this.repository.findDetail(id);

    if (!existingDetail) {
      throw new NotFoundException(
        'El detalle de compra no existe.',
      );
    }

    if (existingDetail.compra.estado !== EstadoCompra.BORRADOR) {
      throw new BadRequestException(
        'Solo se pueden modificar compras en estado BORRADOR.',
      );
    }

    const updatedDetail = await this.repository.update(id, {
      cantidad: request.cantidad,
      precioUnitario: request.precioUnitario,
      porcentajeDescuento: request.porcentajeDescuento,
      porcentajeIva: request.porcentajeIva,
    });

    await this.recalculatePurchaseTotalsService.execute(
      updatedDetail.compraId,
    );

    return updatedDetail;
  }
}