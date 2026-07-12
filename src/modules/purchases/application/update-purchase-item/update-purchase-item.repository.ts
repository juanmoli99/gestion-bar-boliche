import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class UpdatePurchaseItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findDetail(id: string) {
    return this.prisma.compraDetalle.findUnique({
      where: { id },
      select: {
        id: true,
        compraId: true,
        compra: {
          select: {
            estado: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      cantidad?: number;
      precioUnitario?: number;
      porcentajeDescuento?: number;
      porcentajeIva?: number;
    },
  ) {
    return this.prisma.compraDetalle.update({
      where: { id },
      data,
      select: {
        id: true,
        compraId: true,
        itemId: true,
        cantidad: true,
        precioUnitario: true,
        porcentajeDescuento: true,
        porcentajeIva: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}