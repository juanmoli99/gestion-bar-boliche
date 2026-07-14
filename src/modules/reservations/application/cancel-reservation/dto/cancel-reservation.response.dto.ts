import {
  EstadoReserva,
} from '../../../../../generated/prisma/enums';

export class CancelReservationResponseDto {
  id!: string;

  estado!: EstadoReserva;

  motivoCancelacion!: string | null;

  actualizadoEn!: Date;
}