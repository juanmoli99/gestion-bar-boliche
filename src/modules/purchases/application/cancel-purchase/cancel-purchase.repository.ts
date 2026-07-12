import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoCompra,
  TipoMovimientoStock,
} from '../../../../generated/prisma/enums';

@Injectable()
export class CancelPurchaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async cancel(
    compraId: string,
    usuarioId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const compra = await tx.compra.findUnique({
        where: {
          id: compraId,
        },
        include: {
          detalles: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!compra) {
        throw new NotFoundException(
          'La compra no existe.',
        );
      }

      if (
        compra.estado !== EstadoCompra.CONFIRMADA
      ) {
        throw new BadRequestException(
          'Solo se pueden anular compras confirmadas.',
        );
      }

      for (const detalle of compra.detalles) {
        const stock = await tx.stock.findUnique({
          where: {
            itemId_inventario: {
              itemId: detalle.itemId,
              inventario: compra.inventario,
            },
          },
        });

        if (!stock) {
          throw new BadRequestException(
            'No existe stock para revertir.',
          );
        }

        const cantidadAnterior = Number(
          stock.cantidadActual,
        );

        const cantidadPosterior =
          cantidadAnterior -
          Number(detalle.cantidad);

        if (cantidadPosterior < 0) {
          throw new BadRequestException(
            'El stock actual es insuficiente para anular la compra.',
          );
        }

        await tx.stock.update({
          where: {
            id: stock.id,
          },
          data: {
            cantidadActual: cantidadPosterior,
          },
        });

        await tx.movimientoStock.create({
          data: {
            itemId: detalle.itemId,
            inventario: compra.inventario,
            tipo: TipoMovimientoStock.SALIDA,
            cantidad: detalle.cantidad,
            cantidadAnterior,
            cantidadPosterior,
            motivo:
              'Anulación compra ' +
              (compra.numeroComprobante ??
                compra.id),
            usuarioId,
          },
        });

        await tx.historialCostoItem.create({
          data: {
            itemId: detalle.itemId,
            compraId: compra.id,
            costoAnterior:
              detalle.item.ultimoCosto,
            costoNuevo:
              detalle.item.ultimoCosto,
            stockAnterior:
              cantidadAnterior,
            stockNuevo:
              cantidadPosterior,
          },
        });
      }

      return tx.compra.update({
        where: {
          id: compraId,
        },
        data: {
          estado: EstadoCompra.ANULADA,
        },
        select: {
          id: true,
          proveedorId: true,
          inventario: true,
          numeroComprobante: true,
          observaciones: true,
          subtotal: true,
          descuentoTotal: true,
          ivaTotal: true,
          total: true,
          estado: true,
          creadoEn: true,
          actualizadoEn: true,
        },
      });
    });
  }
}