import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { TipoItem } from '../../../../generated/prisma/enums';

interface CreateItemData {
  nombre: string;
  descripcion?: string;
  tipo: TipoItem;
  categoriaId: string;
  unidadMedidaId: string;
  unidadesPorPack?: number;
}

@Injectable()
export class CreateItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async existsByName(
    nombre: string,
    tipo: TipoItem,
  ): Promise<boolean> {
    const item = await this.prisma.item.findFirst({
      where: {
        nombre,
        tipo,
      },
      select: {
        id: true,
      },
    });

    return item !== null;
  }

  async categoriaExiste(id: string): Promise<boolean> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      select: { id: true },
    });

    return categoria !== null;
  }

  async unidadMedidaExiste(id: string): Promise<boolean> {
    const unidad = await this.prisma.unidadMedida.findUnique({
      where: { id },
      select: { id: true },
    });

    return unidad !== null;
  }

  async create(data: CreateItemData) {
    return this.prisma.item.create({
      data,
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