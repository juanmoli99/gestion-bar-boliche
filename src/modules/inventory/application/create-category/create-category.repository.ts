import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

import { TipoInventario } from '../../../../generated/prisma/enums';

interface CreateCategoryData {
  nombre: string;
  descripcion?: string;
  inventario: TipoInventario;
}

@Injectable()
export class CreateCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async exists(
    nombre: string,
    inventario: TipoInventario,
  ): Promise<boolean> {
    const categoria = await this.prisma.categoria.findFirst({
      where: {
        nombre,
        inventario,
      },
      select: {
        id: true,
      },
    });

    return categoria !== null;
  }

  async create(data: CreateCategoryData) {
    return this.prisma.categoria.create({
      data,
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