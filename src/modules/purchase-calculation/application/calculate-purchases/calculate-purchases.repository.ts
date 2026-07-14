import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import { EstadoReserva, TipoReserva } from '../../../../generated/prisma/enums';

@Injectable()
export class CalculatePurchasesRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findReservations(
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    return this.prisma.reserva.findMany({
      where: {
        tipo: TipoReserva.FIESTA,
        estado: EstadoReserva.CONFIRMADA,
        fechaHora: {
          gte: fechaDesde,
          lte: fechaHasta,
        },
      },
      include: {
        formula: true,
        formulaVersion: {
          include: {
            items: {
              include: {
                item: true,
              },
            },
          },
        },
      },
      orderBy: {
        fechaHora: 'asc',
      },
    });
  }
}