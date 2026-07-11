import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListStockRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.stock.findMany({
      orderBy: [
        {
          inventario: 'asc',
        },
        {
          item: {
            nombre: 'asc',
          },
        },
      ],
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