import { Injectable } from '@nestjs/common';

import {
  Prisma,
} from '../../../../generated/prisma/client';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

@Injectable()
export class ListReservationsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll(
    where: Prisma.ReservaWhereInput,
  ) {
    return this.prisma.reserva.findMany({
      where,

      orderBy: {
        fechaHora: 'asc',
      },

      select: {
        id: true,
        tipo: true,
        estado: true,
        nombreCliente: true,
        telefonoCliente: true,
        fechaHora: true,
        cantidadPersonas: true,
        modalidadFiesta: true,
        observaciones: true,

        formula: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }
}