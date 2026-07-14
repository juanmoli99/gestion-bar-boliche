import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

export class GetFormulaItemDto {
  id!: string;

  itemId!: string;

  nombre!: string;

  cantidadPorPersona!: Decimal;
}

export class GetFormulaResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  activa!: boolean;

  versionId!: string;

  numeroVersion!: number;

  items!: GetFormulaItemDto[];
}