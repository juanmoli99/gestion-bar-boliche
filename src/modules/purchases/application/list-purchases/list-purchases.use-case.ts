import {
  Injectable,
} from '@nestjs/common';

import {
  ListPurchasesRepository,
} from './list-purchases.repository';

import {
  ListPurchasesResponseDto,
} from './dto/list-purchases.response.dto';

@Injectable()
export class ListPurchasesUseCase {
  constructor(
    private readonly repository:
      ListPurchasesRepository,
  ) {}

  async execute(): Promise<
    ListPurchasesResponseDto[]
  > {
    const purchases =
      await this.repository.findAll();

    return purchases.map(
      (purchase) => ({
        id: purchase.id,
        proveedorId:
          purchase.proveedorId,
        proveedor:
          purchase.proveedor
            .razonSocial,
        inventario:
          purchase.inventario,
        numeroComprobante:
          purchase.numeroComprobante,
        subtotal:
          purchase.subtotal,
        descuentoTotal:
          purchase.descuentoTotal,
        ivaTotal:
          purchase.ivaTotal,
        total:
          purchase.total,
        estado:
          purchase.estado,
        creadoEn:
          purchase.creadoEn,
        actualizadoEn:
          purchase.actualizadoEn,

        detalles:
          purchase.detalles.map(
            (detalle) => ({
              id: detalle.id,
              itemId:
                detalle.itemId,
              item:
                detalle.item.nombre,
              unidadMedida:
                detalle.item
                  .unidadMedida
                  .abreviatura,
              cantidad:
                detalle.cantidad,
              precioUnitario:
                detalle.precioUnitario,
              porcentajeDescuento:
                detalle.porcentajeDescuento,
              porcentajeIva:
                detalle.porcentajeIva,
            }),
          ),
      }),
    );
  }
}