import { Injectable } from '@nestjs/common';

import {
  EstadoCompra,
  EstadoReserva,
  TipoReserva,
} from '../../../../generated/prisma/enums';

import {
  GetCriticalInventoryUseCase,
} from '../../../inventory/application/get-critical-inventory/get-critical-inventory.use-case';

import {
  ListPurchasesService,
} from '../../../purchases/application/list-purchases/list-purchases.service';

import {
  ListReservationsService,
} from '../../../reservations/application/list-reservations/list-reservations.service';

import {
  DashboardResponseDto,
} from './dto/dashboard.response.dto';

const ACTIVE_RESERVATION_STATES = new Set<EstadoReserva>([
  EstadoReserva.PENDIENTE,
  EstadoReserva.SENADA,
  EstadoReserva.CONFIRMADA,
]);

function getCurrentDateInArgentina(): string {
  const parts = new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  ).formatToParts(new Date());

  const year =
    parts.find(
      (part) => part.type === 'year',
    )?.value;

  const month =
    parts.find(
      (part) => part.type === 'month',
    )?.value;

  const day =
    parts.find(
      (part) => part.type === 'day',
    )?.value;

  if (!year || !month || !day) {
    throw new Error(
      'No se pudo determinar la fecha actual.',
    );
  }

  return `${year}-${month}-${day}`;
}

@Injectable()
export class DashboardRepository {
  constructor(
    private readonly getCriticalInventoryUseCase:
      GetCriticalInventoryUseCase,

    private readonly listReservationsService:
      ListReservationsService,

    private readonly listPurchasesService:
      ListPurchasesService,
  ) {}

  async getDashboard(): Promise<DashboardResponseDto> {
    const today =
    getCurrentDateInArgentina();

    const fechaDesde =
    `${today}T00:00:00-03:00`;

    const fechaHasta =
    `${today}T23:59:59.999-03:00`;

    const [
      criticalInventory,
      tableReservations,
      eventReservations,
      purchases,
    ] = await Promise.all([
      this.getCriticalInventoryUseCase.execute(),

      this.listReservationsService.execute({
        fechaDesde,
        fechaHasta,
        tipo: TipoReserva.MESA,
      }),

      this.listReservationsService.execute({
        fechaDesde,
        fechaHasta,
        tipo: TipoReserva.FIESTA,
      }),

      this.listPurchasesService.execute(),
    ]);

    const inventoryAlerts =
      criticalInventory.groups;

    const todayReservations =
      tableReservations
        .filter((reservation) =>
          ACTIVE_RESERVATION_STATES.has(
            reservation.estado,
          ),
        )
        .sort(
          (a, b) =>
            new Date(a.fechaHora).getTime() -
            new Date(b.fechaHora).getTime(),
        )
        .map((reservation) => ({
          id: reservation.id,
          estado: reservation.estado,
          nombreCliente:
            reservation.nombreCliente,
          telefonoCliente:
            reservation.telefonoCliente,
          fechaHora: reservation.fechaHora,
          cantidadPersonas:
            reservation.cantidadPersonas,
        }));

    const todayEvents =
      eventReservations
        .filter((reservation) =>
          ACTIVE_RESERVATION_STATES.has(
            reservation.estado,
          ),
        )
        .sort(
          (a, b) =>
            new Date(a.fechaHora).getTime() -
            new Date(b.fechaHora).getTime(),
        )
        .map((reservation) => ({
          id: reservation.id,
          estado: reservation.estado,
          nombreCliente:
            reservation.nombreCliente,
          telefonoCliente:
            reservation.telefonoCliente,
          fechaHora: reservation.fechaHora,
          cantidadPersonas:
            reservation.cantidadPersonas,
          nombreFormula:
            reservation.nombreFormula,
        }));

    const pendingPurchases =
      purchases
        .filter(
          (purchase) =>
            purchase.estado ===
            EstadoCompra.BORRADOR,
        )
        .sort(
          (a, b) =>
            new Date(a.creadoEn).getTime() -
            new Date(b.creadoEn).getTime(),
        )
        .map((purchase) => ({
          id: purchase.id,
          proveedorId:
            purchase.proveedorId,
          proveedor: purchase.proveedor,
          inventario: purchase.inventario,
          numeroComprobante:
            purchase.numeroComprobante,
          total: purchase.total,
          estado: purchase.estado,
          creadoEn: purchase.creadoEn,
        }));

    return {
      generatedAt: new Date(),

      summary: {
        inventoryAlerts:
          inventoryAlerts.reduce(
            (total, group) =>
              total + group.items.length,
            0,
          ),

        todayReservations:
          todayReservations.length,

        todayEvents:
          todayEvents.length,

        pendingPurchases:
          pendingPurchases.length,
      },

      inventoryAlerts,
      todayReservations,
      todayEvents,
      pendingPurchases,
    };
  }
}