import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import {
  EstadoCalculoCompra,
} from '../../../../generated/prisma/enums';

@Injectable()
export class RestoreCalculationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findById(id: string) {
    return this.prisma.calculoCompraFiesta.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        estado: true,
      },
    });
  }

  restore(id: string) {
    return this.prisma.calculoCompraFiesta.update({
      where: {
        id,
      },
      data: {
        estado: EstadoCalculoCompra.BORRADOR,
      },
      select: {
        id: true,
        estado: true,
        actualizadoEn: true,
      },
    });
  }
}