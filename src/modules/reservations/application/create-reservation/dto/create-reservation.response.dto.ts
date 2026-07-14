import {
  EstadoReserva,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class CreateReservationResponseDto {
  id!: string;

  tipo!: TipoReserva;

  estado!: EstadoReserva;

  nombreCliente!: string;

  telefonoCliente!: string | null;

  fechaHora!: Date;

  cantidadPersonas!: number;

  cantidadMenusSinTacc!: number | null;

  tipoFiesta!: string | null;

  formulaId!: string | null;

  formulaVersionId!: string | null;

  observaciones!: string | null;

  creadoEn!: Date;
}