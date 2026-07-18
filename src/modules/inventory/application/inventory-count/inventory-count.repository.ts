import { Injectable } from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  TipoMovimientoStock,
} from '../../../../generated/prisma/enums';

@Injectable()
export class InventoryCountRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(stockId: string) {
    return this.prisma.stock.findUnique({
      where: {
        id: stockId,
      },
      select: {
        id: true,
        inventario: true,
      },
    });
  }

  async count(
    stockId: string,
    cantidadContada: number,
    usuarioId: string,
  ) {
    return this.prisma.$transaction(
      async (transaction) => {
        const stock =
          await transaction.stock.findUnique({
            where: {
              id: stockId,
            },
          });

        if (!stock) {
          return null;
        }

        const cantidadAnterior =
          Number(
            stock.cantidadActual,
          );

        const diferencia =
          Number(
            (
              cantidadContada -
              cantidadAnterior
            ).toFixed(3),
          );

        if (diferencia === 0) {
          return {
            stockId:
              stock.id,

            itemId:
              stock.itemId,

            cantidadAnterior:
              stock.cantidadActual,

            cantidadContada,

            diferencia:
              0,

            cantidadActual:
              cantidadAnterior,
          };
        }

        const updatedStock =
          await transaction.stock.update({
            where: {
              id: stockId,
            },

            data: {
              cantidadActual:
                cantidadContada,
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
                  ? TipoMovimientoStock.AJUSTE_POSITIVO
                  : TipoMovimientoStock.AJUSTE_NEGATIVO,

              cantidad:
                Math.abs(
                  diferencia,
                ),

              cantidadAnterior,

              cantidadPosterior:
                cantidadContada,

              motivo:
                'Conteo físico',

              usuarioId,
            },
          });

        return {
          stockId:
            stock.id,

          itemId:
            stock.itemId,

          cantidadAnterior:
            stock.cantidadActual,

          cantidadContada,

          diferencia,

          cantidadActual:
            Number(
              updatedStock.cantidadActual,
            ),
        };
      },
    );
  }
}