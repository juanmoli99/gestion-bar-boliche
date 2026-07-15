import {
  EstadoCalculoCompra,
} from '../../../../../generated/prisma/enums';

export class DeleteCalculationResponseDto {
  id!: string;
  estado!: EstadoCalculoCompra;
  actualizadoEn!: Date;
}