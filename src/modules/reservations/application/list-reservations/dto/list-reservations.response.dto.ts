import {
  EstadoReserva,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class ListReservationsResponseDto {
  id!: string;

  tipo!: TipoReserva;

  estado!: EstadoReserva;

  nombreCliente!: string;

  telefonoCliente!: string | null;

  fechaHora!: Date;

  cantidadPersonas!: number;

  nombreFormula!: string | null;
}