import { Injectable } from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

@Injectable()
export class UpdateStockRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findById(
    id: string,
  ) {
    return this.prisma.stock.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
      },
    });
  }

  async updateMinimum(
    id: string,
    cantidadMinima: number,
  ) {
    return this.prisma.stock.update({
      where: {
        id,
      },

      data: {
        cantidadMinima,
      },

      select: {
        id: true,
        itemId: true,
        inventario: true,
        cantidadActual: true,
        cantidadMinima: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}