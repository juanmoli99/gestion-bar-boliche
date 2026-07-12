import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import { EstadoCompra } from '../../../../generated/prisma/enums';

interface AddPurchaseItemData {
  compraId: string;
  itemId: string;
  cantidad: number;
  precioUnitario: number;
  porcentajeDescuento: number;
  porcentajeIva: number;
}

@Injectable()
export class AddPurchaseItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findPurchase(id: string) {
    return this.prisma.compra.findUnique({
      where: { id },
      select: {
        id: true,
        estado: true,
      },
    });
  }

  async findItem(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        activo: true,
      },
    });
  }

  async create(data: AddPurchaseItemData) {
    return this.prisma.compraDetalle.create({
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