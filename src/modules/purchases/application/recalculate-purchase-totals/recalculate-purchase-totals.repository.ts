import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class RecalculatePurchaseTotalsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findItems(compraId: string) {
    return this.prisma.compraDetalle.findMany({
      where: {
        compraId,
      },
      select: {
        cantidad: true,
        precioUnitario: true,
        porcentajeDescuento: true,
        porcentajeIva: true,
      },
    });
  }

  async updateTotals(
    compraId: string,
    subtotal: number,
    descuentoTotal: number,
    ivaTotal: number,
    total: number,
  ) {
    return this.prisma.compra.update({
      where: {
        id: compraId,
      },
      data: {
        subtotal,
        descuentoTotal,
        ivaTotal,
        total,
      },
    });
  }
}