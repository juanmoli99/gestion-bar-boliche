import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../../generated/prisma/enums';

export class ListPurchasesResponseDto {
  id!: string;

  proveedorId!: string;

  proveedor!: string;

  inventario!: TipoInventario;

  numeroComprobante!: string | null;

  subtotal!: Decimal;

  descuentoTotal!: Decimal;

  ivaTotal!: Decimal;

  total!: Decimal;

  estado!: EstadoCompra;

  creadoEn!: Date;

  actualizadoEn!: Date;
}