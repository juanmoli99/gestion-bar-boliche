import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

export class ListFormulaItemsResponseDto {
  id!: string;
  itemId!: string;
  nombreItem!: string;
  unidadMedida!: string;
  abreviaturaUnidad!: string;
  cantidadPorPersona!: Decimal;
  unidadesPorPack!: number | null;
  activo!: boolean;
  creadoEn!: Date;
  actualizadoEn!: Date;
}