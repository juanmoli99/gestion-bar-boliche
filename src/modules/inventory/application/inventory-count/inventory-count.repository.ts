import {
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import { TipoMovimientoStock } from '../../../../generated/prisma/enums';

@Injectable()
export class InventoryCountRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findStock(id: string) {
    return this.prisma.stock.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStock(
    id: string,
    cantidadActual: number,
  ) {
    return this.prisma.stock.update({
      where: {
        id,
      },
      data: {
        cantidadActual,
      },
    });
  }

  async createMovement(data: {
    itemId: string;
    inventario: any;
    cantidad: number;
    cantidadAnterior: number;
    cantidadPosterior: number;
    usuarioId: string;
    motivo: string;
    tipo: TipoMovimientoStock;
  }) {
    return this.prisma.movimientoStock.create({
      data,
    });
  }
}