import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

export class AddPurchaseItemResponseDto {
  id!: string;

  compraId!: string;

  itemId!: string;

  cantidad!: Decimal;

  precioUnitario!: Decimal;

  porcentajeDescuento!: Decimal;

  porcentajeIva!: Decimal;

  creadoEn!: Date;

  actualizadoEn!: Date;
}