import { Injectable } from '@nestjs/common';

import {
  GenerateWeeklyPurchasesRepository,
  WeeklyPurchaseGroupData,
} from './generate-weekly-purchases.repository';

@Injectable()
export class GenerateWeeklyPurchasesUseCase {
  constructor(
    private readonly repository:
      GenerateWeeklyPurchasesRepository,
  ) {}

  async execute(
    userId: string,
  ): Promise<number> {
    const weekKey =
      this.getCurrentWeekKey();

    console.log('SEMANA:', weekKey);

    const weeklyPurchasesExist =
      await this.repository.weeklyPurchasesExist(
        weekKey,
      );

    console.log(
      'YA EXISTE COMPRA SEMANAL:',
      weeklyPurchasesExist,
    );

    if (weeklyPurchasesExist) {
      return 0;
    }

    const criticalStocks =
      await this.repository.findCriticalStocksWithoutFormula();

    console.log(
      'STOCKS CRÍTICOS ENCONTRADOS:',
      criticalStocks,
    );

    if (criticalStocks.length === 0) {
      return 0;
    }

    const groupsMap =
      new Map<
        string,
        WeeklyPurchaseGroupData
      >();

    for (const stock of criticalStocks) {
      const missingQuantity =
        stock.cantidadMinima -
        stock.cantidadActual;

      const packQuantity =
        Math.ceil(
          missingQuantity /
            stock.unidadesPorPack,
        );

      if (packQuantity <= 0) {
        continue;
      }

      const totalUnitQuantity =
        packQuantity *
        stock.unidadesPorPack;

      const groupKey =
        `${stock.proveedorId}:${stock.inventario}`;

      const existingGroup =
        groupsMap.get(groupKey);

      if (existingGroup) {
        existingGroup.detalles.push({
          itemId:
            stock.itemId,

          cantidad:
            totalUnitQuantity,

          precioUnitario:
            stock.precioUnitario,
        });

        continue;
      }

      groupsMap.set(groupKey, {
        proveedorId:
          stock.proveedorId,

        inventario:
          stock.inventario,

        detalles: [
          {
            itemId:
              stock.itemId,

            cantidad:
              totalUnitQuantity,

            precioUnitario:
              stock.precioUnitario,
          },
        ],
      });
    }

    const groups = [
      ...groupsMap.values(),
    ];

    return this.repository
      .createWeeklyPurchases(
        groups,
        userId,
        weekKey,
      );
  }

  private getCurrentWeekKey(): string {
    const argentinaDate =
      new Intl.DateTimeFormat(
        'en-CA',
        {
          timeZone:
            'America/Argentina/Buenos_Aires',

          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      ).format(new Date());

    const [
      year,
      month,
      day,
    ] = argentinaDate
      .split('-')
      .map(Number);

    const currentDate =
      new Date(
        Date.UTC(
          year,
          month - 1,
          day,
        ),
      );

    const dayOfWeek =
      currentDate.getUTCDay();

    const daysSinceMonday =
      dayOfWeek === 0
        ? 6
        : dayOfWeek - 1;

    currentDate.setUTCDate(
      currentDate.getUTCDate() -
        daysSinceMonday,
    );

    return currentDate
      .toISOString()
      .slice(0, 10);
  }
}