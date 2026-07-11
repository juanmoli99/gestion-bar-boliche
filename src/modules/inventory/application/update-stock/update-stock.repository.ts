import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateStockData {
  cantidadActual?: number;
  cantidadMinima?: number;
}

@Injectable()
export class UpdateStockRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.stock.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateStockData,
  ) {
    return this.prisma.stock.update({
      where: { id },
      data,
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