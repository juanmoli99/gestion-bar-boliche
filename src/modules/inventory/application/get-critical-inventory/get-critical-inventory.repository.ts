import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class GetCriticalInventoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findCriticalStocks() {
    return this.prisma.stock.findMany({
      where: {
        cantidadMinima: {
          not: null,
        },
      },
      select: {
        id: true,
        itemId: true,
        inventario: true,
        cantidadActual: true,
        cantidadMinima: true,

        item: {
          select: {
            nombre: true,

            categoria: {
              select: {
                nombre: true,
              },
            },

            unidadMedida: {
              select: {
                nombre: true,
                abreviatura: true,
              },
            },
          },
        },
      },
    });
  }
}