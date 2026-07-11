import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

import {
  TipoInventario,
  TipoMovimientoStock,
} from '../../../../generated/prisma/enums';

interface CreateMovementData {
  itemId: string;
  inventario: TipoInventario;
  tipo: TipoMovimientoStock;
  cantidad: number;
  cantidadAnterior: number;
  cantidadPosterior: number;
  motivo?: string;
  usuarioId?: string;
}

@Injectable()
export class CreateStockMovementRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findStock(
    itemId: string,
    inventario: TipoInventario,
  ) {
    return this.prisma.stock.findUnique({
      where: {
        itemId_inventario: {
          itemId,
          inventario,
        },
      },
    });
  }

  async updateStock(
    id: string,
    cantidadActual: number,
  ) {
    return this.prisma.stock.update({
      where: { id },
      data: {
        cantidadActual,
      },
    });
  }

  async createMovement(
    data: CreateMovementData,
  ) {
    return this.prisma.movimientoStock.create({
      data,
    });
  }
}