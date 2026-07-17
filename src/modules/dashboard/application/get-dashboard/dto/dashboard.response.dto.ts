import {
  EstadoCompra,
  EstadoReserva,
  TipoInventario,
} from '../../../../../generated/prisma/enums';

import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  CriticalInventoryGroupDto,
} from '../../../../inventory/application/get-critical-inventory/dto/get-critical-inventory.response.dto';

export class DashboardSummaryDto {
  inventoryAlerts!: number;
  todayReservations!: number;
  todayEvents!: number;
  pendingPurchases!: number;
}

export class TodayReservationDto {
  id!: string;
  estado!: EstadoReserva;
  nombreCliente!: string;
  telefonoCliente!: string | null;
  fechaHora!: Date;
  cantidadPersonas!: number;
}

export class TodayEventDto {
  id!: string;
  estado!: EstadoReserva;
  nombreCliente!: string;
  telefonoCliente!: string | null;
  fechaHora!: Date;
  cantidadPersonas!: number;
  nombreFormula!: string | null;
}

export class PendingPurchaseDto {
  id!: string;
  proveedorId!: string;
  proveedor!: string;
  inventario!: TipoInventario;
  numeroComprobante!: string | null;
  total!: Decimal;
  estado!: EstadoCompra;
  creadoEn!: Date;
}

export class DashboardResponseDto {
  generatedAt!: Date;

  summary!: DashboardSummaryDto;

  inventoryAlerts!: CriticalInventoryGroupDto[];

  todayReservations!: TodayReservationDto[];

  todayEvents!: TodayEventDto[];

  pendingPurchases!: PendingPurchaseDto[];
}