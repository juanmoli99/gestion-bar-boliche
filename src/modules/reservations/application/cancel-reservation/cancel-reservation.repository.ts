import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoReserva,
} from '../../../../generated/prisma/enums';

@Injectable()
export class CancelReservationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findById(id: string) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
    });
  }

  cancel(
    id: string,
    motivoCancelacion: string,
  ) {
    return this.prisma.reserva.update({
      where: {
        id,
      },
      data: {
        estado: EstadoReserva.CANCELADA,
        motivoCancelacion,
      },
      select: {
        id: true,
        estado: true,
        motivoCancelacion: true,
        actualizadoEn: true,
      },
    });
  }
}