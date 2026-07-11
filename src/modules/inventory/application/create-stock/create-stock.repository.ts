import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { TipoInventario } from '../../../../generated/prisma/enums';

interface CreateStockData {
  itemId: string;
  inventario: TipoInventario;
  cantidadActual?: number;
  cantidadMinima?: number;
}

@Injectable()
export class CreateStockRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async itemExiste(id: string): Promise<boolean> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      select: { id: true },
    });

    return item !== null;
  }

  async stockExiste(
    itemId: string,
    inventario: TipoInventario,
  ): Promise<boolean> {
    const stock = await this.prisma.stock.findUnique({
      where: {
        itemId_inventario: {
          itemId,
          inventario,
        },
      },
      select: {
        id: true,
      },
    });

    return stock !== null;
  }

  async create(data: CreateStockData) {
    return this.prisma.stock.create({
      data,
      select: {
        id: true,
        itemId: true,
        inventario: true,
        cantidadActual: true,
        cantidadMinima: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}