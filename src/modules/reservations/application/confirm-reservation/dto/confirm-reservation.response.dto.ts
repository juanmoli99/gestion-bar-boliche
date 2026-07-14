import {
  EstadoReserva,
} from '../../../../../generated/prisma/enums';

export class ConfirmReservationResponseDto {
  id!: string;

  estado!: EstadoReserva;

  actualizadoEn!: Date;
}