import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeactivateItemRepository {
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

  async deactivate(id: string) {
    return this.prisma.item.update({
      where: { id },
      data: {
        activo: false,
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