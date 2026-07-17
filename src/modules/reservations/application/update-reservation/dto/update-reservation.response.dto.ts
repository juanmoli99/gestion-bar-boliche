import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  EstadoReserva,
  ModalidadFiesta,
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

  modalidadFiesta!: ModalidadFiesta | null;

  formulaId!: string | null;

  formulaVersionId!: string | null;

  observaciones!: string | null;

  precioTotal!: Decimal | null;

  montoSena!: Decimal | null;

  saldoPendiente!: Decimal | null;

  valorPizzaLibreAplicado!: Decimal | null;

  valorMenuSinTaccAplicado!: Decimal | null;

  valorBarraLibreAplicado!: Decimal | null;

  actualizadoEn!: Date;
}