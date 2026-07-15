import {
  EstadoReserva,
} from '../../../../../generated/prisma/enums';

export class UpdateReservationStatusResponseDto {
  id!: string;

  estado!: EstadoReserva;

  actualizadoEn!: Date;
}