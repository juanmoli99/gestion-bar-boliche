import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../../generated/prisma/enums';

export class ConfirmPurchaseResponseDto {
  id!: string;

  proveedorId!: string;

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
}