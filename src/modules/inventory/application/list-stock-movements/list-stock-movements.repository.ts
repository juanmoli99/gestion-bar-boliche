import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListStockMovementsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.movimientoStock.findMany({
      orderBy: {
        creadoEn: 'desc',
      },
      select: {
        id: true,
        itemId: true,
        inventario: true,
        tipo: true,
        cantidad: true,
        cantidadAnterior: true,
        cantidadPosterior: true,
        motivo: true,
        usuarioId: true,
        creadoEn: true,
      },
    });
  }
}