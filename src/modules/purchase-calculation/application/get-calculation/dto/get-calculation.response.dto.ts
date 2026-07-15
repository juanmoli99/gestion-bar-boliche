import {
  EstadoCalculoCompra,
} from '../../../../../generated/prisma/enums';

export class GetCalculationReservationDto {
  reservaId!: string;

  cantidadPersonas!: number;
}

export class GetCalculationItemDto {
  itemId!: string;

  cantidadCalculada!: number;

  cantidadAjustada!: number | null;

  cantidadPacksCalculada!: number | null;

  fecha!: Date;
}

export class GetCalculationResponseDto {
  id!: string;

  fechaDesde!: Date;

  fechaHasta!: Date;

  estado!: EstadoCalculoCompra;

  cantidadPersonasTotal!: number;

  observaciones!: string | null;

  creadoEn!: Date;

  actualizadoEn!: Date;

  reservas!: GetCalculationReservationDto[];

  items!: GetCalculationItemDto[];
}