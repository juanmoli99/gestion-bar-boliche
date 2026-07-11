import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

import { TipoInventario } from '../../../../generated/prisma/enums';

@Injectable()
export class ListCategoriesByInventoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByInventory(
    inventario: TipoInventario,
  ) {
    return this.prisma.categoria.findMany({
      where: {
        inventario,
        activa: true,
      },
      orderBy: {
        nombre: 'asc',
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        inventario: true,
        activa: true,
      },
    });
  }
}