import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class FindItemByIdRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        tipo: true,
        categoriaId: true,
        unidadMedidaId: true,
        proveedorId: true,
        unidadesPorPack: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}