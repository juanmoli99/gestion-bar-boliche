import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class CalculateShoppingListRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findItemsWithStock(
    itemIds: string[],
  ) {
    return this.prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
      select: {
        id: true,
        nombre: true,
        unidadesPorPack: true,
        categoria: {
          select: {
            inventario: true,
          },
        },
        unidadMedida: {
          select: {
            nombre: true,
            abreviatura: true,
            permiteDecimal: true,
          },
        },
        stocks: {
          select: {
            inventario: true,
            cantidadActual: true,
          },
        },
      },
    });
  }
}