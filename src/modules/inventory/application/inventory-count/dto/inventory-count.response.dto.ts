import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

export class InventoryCountResponseDto {
  stockId!: string;

  itemId!: string;

  cantidadAnterior!: Decimal;

  cantidadContada!: number;

  diferencia!: number;

  cantidadActual!: number;
}