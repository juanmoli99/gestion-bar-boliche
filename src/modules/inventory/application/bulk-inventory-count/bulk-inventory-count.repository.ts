import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  TipoMovimientoStock,
} from '../../../../generated/prisma/enums';

interface BulkCountItem {
  stockId: string;
  cantidadContada: number;
}

interface BulkCountResultItem {
  stockId: string;
  itemId: string;
  cantidadAnterior: number;
  cantidadContada: number;
  diferencia: number;
  cantidadActual: number;
  actualizado: boolean;
}

interface BulkCountResult {
  missingStockIds: string[];
  items: BulkCountResultItem[];
}

@Injectable()
export class BulkInventoryCountRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async countAll(
    items: BulkCountItem[],
    usuarioId: string,
  ): Promise<BulkCountResult> {
    return this.prisma.$transaction(
      async (transaction) => {
        const stockIds =
          items.map(
            (item) =>
              item.stockId,
          );

        const stocks =
          await transaction.stock.findMany({
            where: {
              id: {
                in: stockIds,
              },
            },

            select: {
              id: true,
              itemId: true,
              inventario: true,
              cantidadActual: true,
            },
          });

        const stocksById =
          new Map(
            stocks.map(
              (stock) => [
                stock.id,
                stock,
              ],
            ),
          );

        const missingStockIds =
          stockIds.filter(
            (stockId) =>
              !stocksById.has(
                stockId,
              ),
          );

        /*
         * Se validan todos los IDs antes de realizar
         * cualquier actualización.
         */
        if (
          missingStockIds.length > 0
        ) {
          return {
            missingStockIds,
            items: [],
          };
        }

        const results:
          BulkCountResultItem[] = [];

        for (
          const item of items
        ) {
          const stock =
            stocksById.get(
              item.stockId,
            );

          if (!stock) {
            continue;
          }

          const cantidadAnterior =
            Number(
              stock.cantidadActual,
            );

          const cantidadContada =
            Number(
              item.cantidadContada.toFixed(
                3,
              ),
            );

          const diferencia =
            Number(
              (
                cantidadContada -
                cantidadAnterior
              ).toFixed(3),
            );

          if (diferencia === 0) {
            results.push({
              stockId:
                stock.id,

              itemId:
                stock.itemId,

              cantidadAnterior,

              cantidadContada,

              diferencia:
                0,

              cantidadActual:
                cantidadAnterior,

              actualizado:
                false,
            });

            continue;
          }

          const updatedStock =
            await transaction.stock.update({
              where: {
                id: stock.id,
              },

              data: {
                cantidadActual:
                  cantidadContada,
              },

              select: {
                cantidadActual: true,
              },
            });

          await transaction
            .movimientoStock
            .create({
              data: {
                itemId:
                  stock.itemId,

                inventario:
                  stock.inventario,

                tipo:
                  diferencia > 0
                    ? TipoMovimientoStock
                        .AJUSTE_POSITIVO
                    : TipoMovimientoStock
                        .AJUSTE_NEGATIVO,

                cantidad:
                  Math.abs(
                    diferencia,
                  ),

                cantidadAnterior,

                cantidadPosterior:
                  cantidadContada,

                motivo:
                  'Conteo físico general',

                usuarioId,
              },
            });

          results.push({
            stockId:
              stock.id,

            itemId:
              stock.itemId,

            cantidadAnterior,

            cantidadContada,

            diferencia,

            cantidadActual:
              Number(
                updatedStock
                  .cantidadActual,
              ),

            actualizado:
              true,
          });
        }

        return {
          missingStockIds: [],
          items: results,
        };
      },
    );
  }
}