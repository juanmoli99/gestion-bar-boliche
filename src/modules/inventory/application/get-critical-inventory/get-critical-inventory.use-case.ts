import { Injectable } from '@nestjs/common';

import {
  Prisma,
} from '../../../../generated/prisma/client';

import {
  GetCriticalInventoryRepository,
} from './get-critical-inventory.repository';

import {
  CriticalInventoryGroupDto,
  CriticalInventoryItemDto,
  GetCriticalInventoryResponseDto,
} from './dto/get-critical-inventory.response.dto';

@Injectable()
export class GetCriticalInventoryUseCase {
  constructor(
    private readonly repository:
      GetCriticalInventoryRepository,
  ) {}

  async execute(): Promise<GetCriticalInventoryResponseDto> {
    const stocks =
      await this.repository.findCriticalStocks();

    const criticalItems: CriticalInventoryItemDto[] =
      stocks
        .filter((stock) => {
          if (stock.cantidadMinima === null) {
            return false;
          }

          return stock.cantidadActual.lessThanOrEqualTo(
            stock.cantidadMinima,
          );
        })
        .map((stock) => {
          const cantidadMinima =
            stock.cantidadMinima as Prisma.Decimal;

          const criticidad =
            stock.cantidadActual.lessThanOrEqualTo(0)
              ? 'SIN_STOCK'
              : 'STOCK_BAJO';

          const faltante =
            cantidadMinima
              .minus(stock.cantidadActual)
              .greaterThan(0)
              ? cantidadMinima.minus(
                  stock.cantidadActual,
                )
              : new Prisma.Decimal(0);

          return {
            id: stock.id,
            itemId: stock.itemId,
            itemNombre: stock.item.nombre,
            categoriaNombre:
              stock.item.categoria.nombre,
            unidadMedida:
              stock.item.unidadMedida.nombre,
            abreviaturaUnidad:
              stock.item.unidadMedida.abreviatura,
            inventario: stock.inventario,
            cantidadActual:
              stock.cantidadActual,
            cantidadMinima,
            criticidad,
            faltante,
          };
        });

    const groupsMap =
      new Map<
        string,
        CriticalInventoryItemDto[]
      >();

    for (const item of criticalItems) {
      const current =
        groupsMap.get(item.inventario) ?? [];

      current.push(item);

      groupsMap.set(
        item.inventario,
        current,
      );
    }

    const groups: CriticalInventoryGroupDto[] =
      Array.from(groupsMap.entries())
        .map(([inventario, items]) => ({
          inventario:
            inventario as CriticalInventoryGroupDto['inventario'],

          items: items.sort((a, b) => {
            if (
              a.criticidad !==
              b.criticidad
            ) {
              return a.criticidad ===
                'SIN_STOCK'
                ? -1
                : 1;
            }

            const faltanteComparison =
              b.faltante.comparedTo(
                a.faltante,
              );

            if (faltanteComparison !== 0) {
              return faltanteComparison;
            }

            return a.itemNombre.localeCompare(
              b.itemNombre,
              'es',
            );
          }),
        }))
        .sort((a, b) =>
          a.inventario.localeCompare(
            b.inventario,
            'es',
          ),
        );

    return {
      groups,
    };
  }
}