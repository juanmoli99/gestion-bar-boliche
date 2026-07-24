import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../generated/prisma/enums';

interface CreatePurchaseDetailData {
  itemId: string;
  cantidad: number;
  precioUnitario: number;
  porcentajeDescuento?: number;
  porcentajeIva?: number;
}

interface CreatePurchaseData {
  proveedorId: string;
  inventario: TipoInventario;
  numeroComprobante?: string;
  observaciones?: string;
  estado: EstadoCompra;
  detalles?: CreatePurchaseDetailData[];
}

@Injectable()
export class CreatePurchaseRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async supplierExists(
    proveedorId: string,
  ): Promise<boolean> {
    const supplier =
      await this.prisma.proveedor.findUnique({
        where: {
          id: proveedorId,
        },
        select: {
          id: true,
          activo: true,
        },
      });

    return supplier?.activo === true;
  }

  async itemsBelongToSupplier(
    itemIds: string[],
    proveedorId: string,
  ): Promise<boolean> {
    const uniqueItemIds = [
      ...new Set(itemIds),
    ];

    if (uniqueItemIds.length === 0) {
      return true;
    }

    const matchingItems =
      await this.prisma.item.count({
        where: {
          id: {
            in: uniqueItemIds,
          },
          proveedorId,
          activo: true,
        },
      });

    return (
      matchingItems ===
      uniqueItemIds.length
    );
  }

  async create(
    data: CreatePurchaseData,
  ) {
    return this.prisma.compra.create({
      data: {
        proveedorId:
          data.proveedorId,

        inventario:
          data.inventario,

        numeroComprobante:
          data.numeroComprobante,

        observaciones:
          data.observaciones,

        estado:
          data.estado,

        detalles:
          data.detalles &&
          data.detalles.length > 0
            ? {
                create:
                  data.detalles.map(
                    (detalle) => ({
                      itemId:
                        detalle.itemId,

                      cantidad:
                        detalle.cantidad,

                      precioUnitario:
                        detalle.precioUnitario,

                      porcentajeDescuento:
                        detalle
                          .porcentajeDescuento ??
                        0,

                      porcentajeIva:
                        detalle
                          .porcentajeIva ??
                        21,
                    }),
                  ),
              }
            : undefined,
      },

      select: {
        id: true,
        proveedorId: true,
        inventario: true,
        numeroComprobante: true,
        observaciones: true,
        estado: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}