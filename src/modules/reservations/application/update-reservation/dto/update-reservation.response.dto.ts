import {
  EstadoReserva,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class UpdateReservationResponseDto {
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

  actualizadoEn!: Date;
}