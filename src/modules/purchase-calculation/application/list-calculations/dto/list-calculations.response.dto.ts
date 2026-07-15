import {
  EstadoCalculoCompra,
} from '../../../../../generated/prisma/enums';

export class CalculationHistoryItemDto {
  id!: string;

  fechaDesde!: Date;

  fechaHasta!: Date;

  estado!: EstadoCalculoCompra;

  cantidadPersonasTotal!: number;

  cantidadReservas!: number;

  creadoEn!: Date;
}

export class ListCalculationsResponseDto {
  total!: number;

  page!: number;

  pageSize!: number;

  data!: CalculationHistoryItemDto[];
}