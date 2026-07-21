import { Prisma } from '../../../../../generated/prisma/client';

export class CreateFreeBarRateResponseDto {
  id!: string;

  nombre!: string;

  valorPersona!: Prisma.Decimal;

  activa!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;
}