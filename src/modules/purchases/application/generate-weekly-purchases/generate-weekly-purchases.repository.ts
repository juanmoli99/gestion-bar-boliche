import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../generated/prisma/enums';

export interface CriticalStockItem {
  itemId: string;
  proveedorId: string;
  inventario: TipoInventario;
  cantidadActual: number;
  cantidadMinima: number;
  unidadesPorPack: number;
  precioUnitario: number;
}

export interface WeeklyPurchaseDetailData {
  itemId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface WeeklyPurchaseGroupData {
  proveedorId: string;
  inventario: TipoInventario;
  detalles: WeeklyPurchaseDetailData[];
}

@Injectable()
export class GenerateWeeklyPurchasesRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async weeklyPurchasesExist(
    weekKey: string,
  ): Promise<boolean> {
    const marker =
      this.createWeeklyMarker(weekKey);

    const purchasesCount =
      await this.prisma.compra.count({
        where: {
          observaciones: {
            contains: marker,
          },
        },
      });

    return purchasesCount > 0;
  }

  async findCriticalStocksWithoutFormula(): Promise<
    CriticalStockItem[]
  > {
    const stocks =
      await this.prisma.stock.findMany({
      where: {
        cantidadMinima: {
          not: null,
        },

        item: {
          activo: true,

          proveedor: {
            activo: true,
          },

          formulaCocinaItems: {
            none: {},
          },
        },
      },
        select: {
          inventario: true,
          cantidadActual: true,
          cantidadMinima: true,
          
          item: {
            select: {
              id: true,
              proveedorId: true,
              unidadesPorPack: true,
              ultimoCosto: true,
              nombre: true,
              formulaCocinaItems: {
              select: {
                formulaCocina: {
                  select: {
                    nombre: true,
                    activa: true,
                  },
                },
              },
            },
            },
          },
        },
      });

      console.log(
        'ÍTEMS Y FÓRMULAS DE COCINA:',
        stocks.map((stock) => ({
          nombre: stock.item.nombre,
          formulas: stock.item.formulaCocinaItems,
        })),
      );

    return stocks
      .filter((stock) => {
        if (stock.cantidadMinima === null) {
          return false;
        }

        const cantidadActual =
          Number(stock.cantidadActual);

        const cantidadMinima =
          Number(stock.cantidadMinima);

        return (
          cantidadActual <= cantidadMinima &&
          cantidadMinima - cantidadActual > 0 &&
          stock.item.unidadesPorPack > 0
        );
      })
      .map((stock) => ({
        itemId: stock.item.id,

        proveedorId:
          stock.item.proveedorId,

        inventario:
          stock.inventario,

        cantidadActual:
          Number(stock.cantidadActual),

        cantidadMinima:
          Number(stock.cantidadMinima),

        unidadesPorPack:
          stock.item.unidadesPorPack,

        precioUnitario:
          Number(stock.item.ultimoCosto),
      }));
  }

  async createWeeklyPurchases(
    groups: WeeklyPurchaseGroupData[],
    userId: string,
    weekKey: string,
  ): Promise<number> {
    if (groups.length === 0) {
      return 0;
    }

    const marker =
      this.createWeeklyMarker(weekKey);

    const operations = groups.map(
      (group) =>
        this.prisma.compra.create({
          data: {
            proveedorId:
              group.proveedorId,

            inventario:
              group.inventario,

            usuarioId:
              userId,

            estado:
              EstadoCompra.BORRADOR,

            observaciones:
              `Compra automática semanal ${marker}`,

            detalles: {
              create:
                group.detalles.map(
                  (detalle) => ({
                    itemId:
                      detalle.itemId,

                    cantidad:
                      detalle.cantidad,

                    precioUnitario:
                      detalle.precioUnitario,

                    porcentajeDescuento:
                      0,

                    porcentajeIva:
                      21,
                  }),
                ),
            },
          },
        }),
    );

    await this.prisma.$transaction(
      operations,
    );

    return groups.length;
  }

  private createWeeklyMarker(
    weekKey: string,
  ): string {
    return `[COMPRA_SEMANAL:${weekKey}]`;
  }
}