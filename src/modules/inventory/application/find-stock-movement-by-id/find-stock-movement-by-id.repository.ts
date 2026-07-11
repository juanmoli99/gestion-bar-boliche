import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class FindStockMovementByIdRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.movimientoStock.findUnique({
      where: { id },
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