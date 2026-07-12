import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

export class ListPurchaseItemsResponseDto {
  id!: string;

  itemId!: string;

  nombreItem!: string;

  cantidad!: Decimal;

  precioUnitario!: Decimal;

  porcentajeDescuento!: Decimal;

  porcentajeIva!: Decimal;

  creadoEn!: Date;

  actualizadoEn!: Date;
}