import { Injectable } from '@nestjs/common';

import { CalculatePurchasesRepository } from '../application/calculate-purchases/calculate-purchases.repository';

import {
  CalculationResult,
  CalculationReservation,
  CalculationReservationItem,
  CalculationDate,
  CalculationItemTotal,
} from './purchase-calculation.types';

interface ItemAcumulado {
  itemId: string;
  nombreItem: string;
  cantidadNecesaria: number;
}

interface FechaAcumulada {
  fecha: string;
  cantidadPersonas: number;
  cantidadFiestas: number;
  items: Map<string, ItemAcumulado>;
}

@Injectable()
export class PurchaseCalculationEngine {
  constructor(
    private readonly repository: CalculatePurchasesRepository,
  ) {}

  async execute(
    fechaDesde: Date,
    fechaHasta: Date,
  ): Promise<CalculationResult> {

    const reservas =
      await this.repository.findReservations(
        fechaDesde,
        fechaHasta,
      );

    const totalesPorItem =
      new Map<string, ItemAcumulado>();

    const desglosePorFecha =
      new Map<string, FechaAcumulada>();

    let cantidadPersonasTotal = 0;

    const reservasCalculadas: CalculationReservation[] =
      reservas.map((reserva) => {

        cantidadPersonasTotal +=
          reserva.cantidadPersonas;

        const fecha =
          reserva.fechaHora
            .toISOString()
            .slice(0, 10);

        let fechaAcumulada =
          desglosePorFecha.get(fecha);

        if (!fechaAcumulada) {

          fechaAcumulada = {
            fecha,
            cantidadPersonas: 0,
            cantidadFiestas: 0,
            items: new Map(),
          };

          desglosePorFecha.set(
            fecha,
            fechaAcumulada,
          );
        }

        fechaAcumulada.cantidadPersonas +=
          reserva.cantidadPersonas;

        fechaAcumulada.cantidadFiestas++;

        const items: CalculationReservationItem[] =
          reserva.formulaVersion?.items
            .filter(
              (formulaItem) =>
                formulaItem.activo &&
                formulaItem.item.activo,
            )
            .map((formulaItem) => {

              const cantidadNecesaria =
                Number(
                  formulaItem.cantidadPorPersona,
                ) *
                reserva.cantidadPersonas;

              const total =
                totalesPorItem.get(
                  formulaItem.itemId,
                );

              if (total) {
                total.cantidadNecesaria +=
                  cantidadNecesaria;
              } else {

                totalesPorItem.set(
                  formulaItem.itemId,
                  {
                    itemId:
                      formulaItem.itemId,
                    nombreItem:
                      formulaItem.item.nombre,
                    cantidadNecesaria,
                  },
                );

              }

              const itemFecha =
                fechaAcumulada.items.get(
                  formulaItem.itemId,
                );

              if (itemFecha) {

                itemFecha.cantidadNecesaria +=
                  cantidadNecesaria;

              } else {

                fechaAcumulada.items.set(
                  formulaItem.itemId,
                  {
                    itemId:
                      formulaItem.itemId,
                    nombreItem:
                      formulaItem.item.nombre,
                    cantidadNecesaria,
                  },
                );

              }

              return {
                itemId:
                  formulaItem.itemId,
                nombreItem:
                  formulaItem.item.nombre,
                cantidadPorPersona:
                  Number(
                    formulaItem.cantidadPorPersona,
                  ),
                cantidadNecesaria:
                  this.round(
                    cantidadNecesaria,
                  ),
              };

            }) ?? [];

        return {

          reservaId:
            reserva.id,

          nombreCliente:
            reserva.nombreCliente,

          fechaHora:
            reserva.fechaHora,

          cantidadPersonas:
            reserva.cantidadPersonas,

          formulaId:
            reserva.formulaId!,

          formula:
            reserva.formula?.nombre ?? '',

          versionId:
            reserva.formulaVersionId!,

          numeroVersion:
            reserva.formulaVersion
              ?.numeroVersion ?? 0,

          items,

        };

      });

    const fechas: CalculationDate[] =
      Array.from(
        desglosePorFecha.values(),
      )
      .sort(
        (a, b) =>
          a.fecha.localeCompare(
            b.fecha,
          ),
      )
      .map((fecha) => ({

        fecha:
          fecha.fecha,

        cantidadPersonas:
          fecha.cantidadPersonas,

        cantidadFiestas:
          fecha.cantidadFiestas,

        items:
          Array.from(
            fecha.items.values(),
          )
          .map((item) => ({
            itemId:
              item.itemId,
            nombreItem:
              item.nombreItem,
            cantidadNecesaria:
              this.round(
                item.cantidadNecesaria,
              ),
          }))
          .sort(
            (a, b) =>
              a.nombreItem.localeCompare(
                b.nombreItem,
              ),
          ),

      }));

    const totales: CalculationItemTotal[] =
      Array.from(
        totalesPorItem.values(),
      )
      .map((item) => ({
        itemId:
          item.itemId,
        nombreItem:
          item.nombreItem,
        cantidadNecesaria:
          this.round(
            item.cantidadNecesaria,
          ),
      }))
      .sort(
        (a, b) =>
          a.nombreItem.localeCompare(
            b.nombreItem,
          ),
      );

    return {

      fechaDesde,

      fechaHasta,

      cantidadPersonasTotal,

      cantidadFiestas:
        reservas.length,

      reservas:
        reservasCalculadas,

      desglosePorFecha:
        fechas,

      totalesPorItem:
        totales,

    };
  }

  private round(
    value: number,
  ): number {

    return Number(
      value.toFixed(3),
    );

  }
}