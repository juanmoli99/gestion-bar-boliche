import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoReserva,
} from '../../../../generated/prisma/enums';

@Injectable()
export class ConfirmReservationRepository {
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

  confirm(id: string) {
    return this.prisma.reserva.update({
      where: {
        id,
      },
      data: {
        estado: EstadoReserva.CONFIRMADA,
      },
      select: {
        id: true,
        estado: true,
        actualizadoEn: true,
      },
    });
  }
}