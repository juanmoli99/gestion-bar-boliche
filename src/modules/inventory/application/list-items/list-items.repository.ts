import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListItemsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.item.findMany({
      orderBy: {
        nombre: 'asc',
      },
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