import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import { EstadoReserva } from '../../../../generated/prisma/enums';

@Injectable()
export class UpdateReservationStatusRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findById(id: string) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        estado: true,
      },
    });
  }

  update(
    id: string,
    estado: EstadoReserva,
    usuarioId: string,
  ) {
    return this.prisma.reserva.update({
      where: {
        id,
      },
      data: {
        estado,
        usuarioActualizadorId: usuarioId,
      },
      select: {
        id: true,
        estado: true,
        actualizadoEn: true,
      },
    });
  }
}