import {
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class FindPurchaseByIdRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.compra.findUnique({
      where: {
        id,
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
        proveedor: {
          select: {
            razonSocial: true,
          },
        },
        detalles: {
          orderBy: {
            creadoEn: 'asc',
          },
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
              },
            },
          },
        },
      },
    });
  }
}