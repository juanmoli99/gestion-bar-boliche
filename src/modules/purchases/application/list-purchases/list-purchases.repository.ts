import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

@Injectable()
export class ListPurchasesRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findAll() {
    return this.prisma.compra.findMany({
      orderBy: {
        creadoEn: 'desc',
      },

      select: {
        id: true,
        proveedorId: true,
        inventario: true,
        numeroComprobante: true,
        subtotal: true,
        descuentoTotal: true,
        ivaTotal: true,
        total: true,
        estado: true,
        creadoEn: true,
        actualizadoEn: true,

        proveedor: {
          select: {
            razonSocial: true,
          },
        },

        detalles: {
          select: {
            id: true,
            itemId: true,
            cantidad: true,
            precioUnitario: true,
            porcentajeDescuento: true,
            porcentajeIva: true,

            item: {
              select: {
                nombre: true,

                unidadMedida: {
                  select: {
                    abreviatura: true,
                  },
                },
              },
            },
          },

          orderBy: {
            creadoEn: 'asc',
          },
        },
      },
    });
  }
}