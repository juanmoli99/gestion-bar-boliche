import { Injectable } from '@nestjs/common';

import { Prisma } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListReservationsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll(where: Prisma.ReservaWhereInput) {
    return this.prisma.reserva.findMany({
      where,
      orderBy: {
        fechaHora: 'asc',
      },
      include: {
        formula: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }
}