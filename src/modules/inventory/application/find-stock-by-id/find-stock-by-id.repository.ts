import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class FindStockByIdRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.stock.findUnique({
      where: { id },
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