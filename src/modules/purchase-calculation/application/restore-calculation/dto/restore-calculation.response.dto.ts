import {
  EstadoCalculoCompra,
} from '../../../../../generated/prisma/enums';

export class RestoreCalculationResponseDto {
  id!: string;
  estado!: EstadoCalculoCompra;
  actualizadoEn!: Date;
}