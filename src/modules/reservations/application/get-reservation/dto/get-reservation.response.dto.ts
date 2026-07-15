import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  EstadoReserva,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class GetReservationFormulaResponseDto {
  id!: string;

  nombre!: string;

  versionId!: string;

  numeroVersion!: number;
}

export class GetReservationResponseDto {
  id!: string;

  tipo!: TipoReserva;

  estado!: EstadoReserva;

  nombreCliente!: string;

  telefonoCliente!: string | null;

  fechaHora!: Date;

  cantidadPersonas!: number;

  cantidadMenusSinTacc!: number | null;

  tipoFiesta!: string | null;

  observaciones!: string | null;

  motivoCancelacion!: string | null;

  precioTotal!: Decimal | null;

  montoSena!: Decimal | null;

  saldoPendiente!: Decimal | null;

  medioPagoSena!: string | null;

  fechaSena!: Date | null;

  medioPagoFinal!: string | null;

  fechaPagoFinal!: Date | null;

  formula!: GetReservationFormulaResponseDto | null;

  activa!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;
}