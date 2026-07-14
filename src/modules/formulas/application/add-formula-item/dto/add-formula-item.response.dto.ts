import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

export class AddFormulaItemResponseDto {
  id!: string;
  versionId!: string;
  itemId!: string;
  cantidadPorPersona!: Decimal;
  activo!: boolean;
  creadoEn!: Date;
  actualizadoEn!: Date;
}