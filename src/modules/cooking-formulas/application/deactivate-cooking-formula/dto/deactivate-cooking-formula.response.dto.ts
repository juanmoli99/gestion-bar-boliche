import {
  Prisma,
} from '../../../../../generated/prisma/client';

class CookingFormulaItemResponseDto {
  itemId!: string;

  nombreItem!: string;

  itemActivo!: boolean;

  cantidadPorPersona!: Prisma.Decimal;
}

export class DeactivateCookingFormulaResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  pizzasNormalesPorPersona!: Prisma.Decimal;

  activa!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;

  items!: CookingFormulaItemResponseDto[];
}