import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ReactivateItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        activo: true,
      },
    });
  }

  async reactivate(id: string) {
    return this.prisma.item.update({
      where: { id },
      data: {
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        tipo: true,
        categoriaId: true,
        unidadMedidaId: true,
        unidadesPorPack: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}