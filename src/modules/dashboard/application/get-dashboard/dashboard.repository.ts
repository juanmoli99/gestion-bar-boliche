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

function getDateInArgentina(
  date: Date | string,
): string {
  const parts = new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone:
        'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  ).formatToParts(new Date(date));

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
      'No se pudo determinar la fecha de la reserva.',
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

    const [currentYear, currentMonth] =
      today.split('-').map(Number);

    const nextMonth =
      currentMonth === 12
        ? 1
        : currentMonth + 1;

    const nextMonthYear =
      currentMonth === 12
        ? currentYear + 1
        : currentYear;

    const monthStart =
      `${currentYear}-${String(
        currentMonth,
      ).padStart(2, '0')}-01T00:00:00-03:00`;

    const nextMonthStart =
      `${nextMonthYear}-${String(
        nextMonth,
      ).padStart(2, '0')}-01T00:00:00-03:00`;

    const fechaDesde =
    `${today}T00:00:00-03:00`;

    const fechaHasta =
    `${today}T23:59:59.999-03:00`;

    const [
  criticalInventory,
  tableReservations,
  eventReservations,
  purchases,
  monthlyTableReservations,
  monthlyEventReservations,
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

      this.listReservationsService.execute({
        fechaDesde: monthStart,
        fechaHasta: nextMonthStart,
        tipo: TipoReserva.MESA,
      }),

      this.listReservationsService.execute({
        fechaDesde: monthStart,
        fechaHasta: nextMonthStart,
        tipo: TipoReserva.FIESTA,
      }),
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
      const reservationCalendarMap =
  new Map<
    string,
    {
      cantidadReservas: number;
      totalPersonas: number;
      cantidadReservasCena: number;
      cantidadReservasFiesta: number;
      reservas: Array<{
        id: string;
        tipo: 'CENA' | 'FIESTA';
        nombreCliente: string;
        cantidadPersonas: number;
      }>;
    }
  >();

    const monthlyReservations = [
      ...monthlyTableReservations.map(
        (reservation) => ({
          ...reservation,
          tipoCalendario: 'CENA' as const,
        }),
      ),

      ...monthlyEventReservations.map(
        (reservation) => ({
          ...reservation,
          tipoCalendario: 'FIESTA' as const,
        }),
      ),
    ].filter((reservation) => {
      const fechaReserva =
        getDateInArgentina(
          reservation.fechaHora,
        );

      return (
        fechaReserva >= today &&
        ACTIVE_RESERVATION_STATES.has(
          reservation.estado,
        )
      );
    });

for (
  const reservation of
  monthlyReservations
) {
  const fecha =
    getDateInArgentina(
      reservation.fechaHora,
    );

  const current =
    reservationCalendarMap.get(
      fecha,
    ) ?? {
      cantidadReservas: 0,
      totalPersonas: 0,
      cantidadReservasCena: 0,
      cantidadReservasFiesta: 0,
      reservas: [],
    }

    reservationCalendarMap.set(
    fecha,
    {
      cantidadReservas:
        current.cantidadReservas + 1,

      totalPersonas:
        current.totalPersonas +
        reservation.cantidadPersonas,

      cantidadReservasCena:
        current.cantidadReservasCena +
        (
          reservation.tipoCalendario ===
          'CENA'
            ? 1
            : 0
        ),

      cantidadReservasFiesta:
        current.cantidadReservasFiesta +
        (
          reservation.tipoCalendario ===
          'FIESTA'
            ? 1
            : 0
        ),

      reservas: [
        ...current.reservas,
        {
          id: reservation.id,
          tipo:
            reservation.tipoCalendario,
          nombreCliente:
            reservation.nombreCliente,
          cantidadPersonas:
            reservation.cantidadPersonas,
        },
      ],
    },
  );
}

const reservationCalendar =
  Array.from(
    reservationCalendarMap.entries(),
  )
    .map(
      ([
        fecha,
        values,
      ]) => ({
        fecha,
        cantidadReservas:
          values.cantidadReservas,
        totalPersonas:
          values.totalPersonas,
        cantidadReservasCena:
          values.cantidadReservasCena,

        cantidadReservasFiesta:
          values.cantidadReservasFiesta,
        
        reservas:
          values.reservas,
      }),
    )
    .sort(
      (a, b) =>
        a.fecha.localeCompare(
          b.fecha,
        ),
    );

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
      reservationCalendar,
    };
  }
}