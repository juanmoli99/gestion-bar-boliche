import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../../generated/prisma/enums';

class PurchaseItemDto {
  id!: string;

  itemId!: string;

  nombre!: string;

  cantidad!: Decimal;

  precioUnitario!: Decimal;

  porcentajeDescuento!: Decimal;

  porcentajeIva!: Decimal;
}

export class FindPurchaseByIdResponseDto {
  id!: string;

  proveedorId!: string;

  proveedor!: string;

  inventario!: TipoInventario;

  numeroComprobante!: string | null;

  observaciones!: string | null;

  subtotal!: Decimal;

  descuentoTotal!: Decimal;

  ivaTotal!: Decimal;

  total!: Decimal;

  estado!: EstadoCompra;

  creadoEn!: Date;

  actualizadoEn!: Date;

  detalles!: PurchaseItemDto[];
}