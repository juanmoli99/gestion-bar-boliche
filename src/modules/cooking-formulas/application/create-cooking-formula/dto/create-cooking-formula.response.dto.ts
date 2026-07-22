import { Prisma } from '../../../../../generated/prisma/client';

class CookingFormulaItemResponseDto {
  itemId!: string;

  nombreItem!: string;

  itemActivo!: boolean;

  cantidadPorPersona!: Prisma.Decimal;
}

export class CreateCookingFormulaResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  activa!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;

  items!: CookingFormulaItemResponseDto[];
}