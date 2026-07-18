import { Prisma } from '../../../../../generated/prisma/client';

export class UpdateSalaryPositionResponseDto {
  id!: string;

  nombre!: string;

  valorHora!: Prisma.Decimal;

  activo!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;
}