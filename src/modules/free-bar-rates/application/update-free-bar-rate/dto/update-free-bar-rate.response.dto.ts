import { Prisma } from '../../../../../generated/prisma/client';

export class UpdateFreeBarRateResponseDto {
  id!: string;
  nombre!: string;
  valorPersona!: Prisma.Decimal;
  activa!: boolean;
  creadoEn!: Date;
  actualizadoEn!: Date;
}