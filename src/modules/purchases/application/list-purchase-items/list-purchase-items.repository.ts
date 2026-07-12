import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListPurchaseItemsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async purchaseExists(
    compraId: string,
  ): Promise<boolean> {
    const compra = await this.prisma.compra.findUnique({
      where: {
        id: compraId,
      },
      select: {
        id: true,
      },
    });

    return compra !== null;
  }

  async findAll(
    compraId: string,
  ) {
    return this.prisma.compraDetalle.findMany({
      where: {
        compraId,
      },
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
        creadoEn: true,
        actualizadoEn: true,
        item: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }
}