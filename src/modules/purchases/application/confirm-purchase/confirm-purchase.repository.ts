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
export class ConfirmPurchaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async confirm(
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
              item: {
                select: {
                  id: true,
                  ultimoCosto: true,
                  costoPromedio: true,
                  activo: true,
                },
              },
            },
          },
        },
      });

      if (!compra) {
        throw new NotFoundException(
          'La compra no existe.',
        );
      }

      if (compra.estado !== EstadoCompra.BORRADOR) {
        throw new BadRequestException(
          'La compra ya fue confirmada o anulada.',
        );
      }

      if (compra.detalles.length === 0) {
        throw new BadRequestException(
          'La compra no posee productos.',
        );
      }

      for (const detalle of compra.detalles) {
        if (!detalle.item.activo) {
          throw new BadRequestException(
            'La compra contiene un ítem inactivo.',
          );
        }

        const cantidadComprada = Number(
          detalle.cantidad,
        );

        const precioUnitario = Number(
          detalle.precioUnitario,
        );

        const porcentajeDescuento = Number(
          detalle.porcentajeDescuento,
        );

        const porcentajeIva = Number(
          detalle.porcentajeIva,
        );

        const precioConDescuento =
          precioUnitario *
          (1 - porcentajeDescuento / 100);

        const costoUnitarioNuevo =
          precioConDescuento *
          (1 + porcentajeIva / 100);

        const stock = await tx.stock.findUnique({
          where: {
            itemId_inventario: {
              itemId: detalle.itemId,
              inventario: compra.inventario,
            },
          },
        });

        const cantidadAnterior = stock
          ? Number(stock.cantidadActual)
          : 0;

        const cantidadPosterior =
          cantidadAnterior + cantidadComprada;

        const costoPromedioAnterior = Number(
          detalle.item.costoPromedio,
        );

        const valorStockAnterior =
          cantidadAnterior *
          costoPromedioAnterior;

        const valorCompra =
          cantidadComprada *
          costoUnitarioNuevo;

        const costoPromedioNuevo =
          cantidadPosterior > 0
            ? (
                valorStockAnterior +
                valorCompra
              ) / cantidadPosterior
            : costoUnitarioNuevo;

        if (stock) {
          await tx.stock.update({
            where: {
              id: stock.id,
            },
            data: {
              cantidadActual: cantidadPosterior,
            },
          });
        } else {
          await tx.stock.create({
            data: {
              itemId: detalle.itemId,
              inventario: compra.inventario,
              cantidadActual: cantidadPosterior,
            },
          });
        }

        await tx.movimientoStock.create({
          data: {
            itemId: detalle.itemId,
            inventario: compra.inventario,
            tipo: TipoMovimientoStock.ENTRADA,
            cantidad: cantidadComprada,
            cantidadAnterior,
            cantidadPosterior,
            motivo: `Compra ${compra.numeroComprobante ?? compra.id}`,
            usuarioId,
          },
        });

        await tx.item.update({
          where: {
            id: detalle.itemId,
          },
          data: {
            ultimoCosto: costoUnitarioNuevo,
            costoPromedio: costoPromedioNuevo,
          },
        });

        await tx.historialCostoItem.create({
          data: {
            itemId: detalle.itemId,
            compraId: compra.id,
            costoAnterior:
              detalle.item.ultimoCosto,
            costoNuevo: costoUnitarioNuevo,
            stockAnterior: cantidadAnterior,
            stockNuevo: cantidadPosterior,
          },
        });
      }

      return tx.compra.update({
        where: {
          id: compraId,
        },
        data: {
          estado: EstadoCompra.CONFIRMADA,
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