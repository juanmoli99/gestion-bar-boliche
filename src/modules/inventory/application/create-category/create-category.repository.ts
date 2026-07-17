import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  TipoInventario,
} from '../../../../generated/prisma/enums';

interface CreateCategoryData {
  nombre: string;
  descripcion?: string;
  inventario: TipoInventario;
}

@Injectable()
export class CreateCategoryRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findByNameAndInventory(
    nombre: string,
    inventario: TipoInventario,
  ) {
    return this.prisma.categoria.findFirst({
      where: {
        nombre,
        inventario,
      },

      select: {
        id: true,
        activa: true,
      },
    });
  }

  async create(
    data: CreateCategoryData,
  ) {
    return this.prisma.categoria.create({
      data: {
        nombre:
          data.nombre,

        descripcion:
          data.descripcion,

        inventario:
          data.inventario,
      },

      select: {
        id: true,
        nombre: true,
        descripcion: true,
        inventario: true,
        activa: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }

  async reactivate(
    id: string,
    data: CreateCategoryData,
  ) {
    return this.prisma.categoria.update({
      where: {
        id,
      },

      data: {
        nombre:
          data.nombre,

        descripcion:
          data.descripcion ??
          null,

        inventario:
          data.inventario,

        activa:
          true,
      },

      select: {
        id: true,
        nombre: true,
        descripcion: true,
        inventario: true,
        activa: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}