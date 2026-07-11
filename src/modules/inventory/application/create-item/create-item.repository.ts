import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

import {
  TipoInventario,
  TipoItem,
} from '../../../../generated/prisma/enums';

interface CreateItemData {
  nombre: string;
  descripcion?: string;
  inventario: TipoInventario;
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

  async exists(
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

  async categoriaPerteneceAlInventario(
    categoriaId: string,
    inventario: TipoInventario,
  ): Promise<boolean> {
    const categoria = await this.prisma.categoria.findFirst({
      where: {
        id: categoriaId,
        inventario,
        activa: true,
      },
      select: {
        id: true,
      },
    });

    return categoria !== null;
  }

  async create(data: CreateItemData) {
    return this.prisma.item.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        tipo: data.tipo,
        categoriaId: data.categoriaId,
        unidadMedidaId: data.unidadMedidaId,
        unidadesPorPack: data.unidadesPorPack,
      },
    });
  }
}