import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FindPurchaseByIdRepository } from './find-purchase-by-id.repository';
import { FindPurchaseByIdResponseDto } from './dto/find-purchase-by-id.response.dto';

@Injectable()
export class FindPurchaseByIdUseCase {
  constructor(
    private readonly repository: FindPurchaseByIdRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<FindPurchaseByIdResponseDto> {
    const purchase =
      await this.repository.findById(id);

    if (!purchase) {
      throw new NotFoundException(
        'La compra no existe.',
      );
    }

    return {
      id: purchase.id,
      proveedorId: purchase.proveedorId,
      proveedor: purchase.proveedor.razonSocial,
      inventario: purchase.inventario,
      numeroComprobante:
        purchase.numeroComprobante,
      observaciones:
        purchase.observaciones,
      subtotal: purchase.subtotal,
      descuentoTotal:
        purchase.descuentoTotal,
      ivaTotal: purchase.ivaTotal,
      total: purchase.total,
      estado: purchase.estado,
      creadoEn: purchase.creadoEn,
      actualizadoEn:
        purchase.actualizadoEn,
      detalles: purchase.detalles.map(
        (detail) => ({
          id: detail.id,
          itemId: detail.itemId,
          nombre: detail.item.nombre,
          cantidad: detail.cantidad,
          precioUnitario:
            detail.precioUnitario,
          porcentajeDescuento:
            detail.porcentajeDescuento,
          porcentajeIva:
            detail.porcentajeIva,
        }),
      ),
    };
  }
}