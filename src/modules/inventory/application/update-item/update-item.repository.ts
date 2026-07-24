import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { TipoItem } from '../../../../generated/prisma/enums';

interface UpdateItemData {
  nombre?: string;
  descripcion?: string;
  tipo?: TipoItem;
  categoriaId?: string;
  unidadMedidaId?: string;
  proveedorId?: string;
  unidadesPorPack?: number;
}

@Injectable()
export class UpdateItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        tipo: true,
      },
    });
  }

  async existsByName(
    nombre: string,
    tipo: TipoItem,
    excludeId: string,
  ): Promise<boolean> {
    const item = await this.prisma.item.findFirst({
      where: {
        nombre,
        tipo,
        id: {
          not: excludeId,
        },
      },
      select: {
        id: true,
      },
    });

    return item !== null;
  }

  async categoriaExiste(id: string): Promise<boolean> {
    return (
      await this.prisma.categoria.findUnique({
        where: { id },
        select: { id: true },
      })
    ) !== null;
  }

  async unidadMedidaExiste(id: string): Promise<boolean> {
    return (
      await this.prisma.unidadMedida.findUnique({
        where: { id },
        select: { id: true },
      })
    ) !== null;
  }

  async proveedorExiste(id: string): Promise<boolean> {
    return (
      await this.prisma.proveedor.findUnique({
        where: { id },
        select: { id: true },
      })
    ) !== null;
  }

  async update(id: string, data: UpdateItemData) {
    return this.prisma.item.update({
      where: { id },
      data,
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