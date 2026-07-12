import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

import { TipoInventario } from '../../../../generated/prisma/enums';

interface UpdateCategoryData {
  nombre?: string;
  descripcion?: string;
  inventario?: TipoInventario;
}

@Injectable()
export class UpdateCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  async exists(
    nombre: string,
    inventario: TipoInventario,
    excludeId: string,
  ): Promise<boolean> {
    const categoria = await this.prisma.categoria.findFirst({
      where: {
        id: {
          not: excludeId,
        },
        nombre,
        inventario,
      },
      select: {
        id: true,
      },
    });

    return categoria !== null;
  }

  async update(
    id: string,
    data: UpdateCategoryData,
  ) {
    return this.prisma.categoria.update({
      where: { id },
      data,
    });
  }
}