import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateReservationHistoryData {
  reservaId: string;
  usuarioId?: string | null;
  accion: string;
  campo?: string | null;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
}

@Injectable()
export class ReservationHistoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: CreateReservationHistoryData,
  ): Promise<void> {
    await this.prisma.historialReserva.create({
      data: {
        reservaId: data.reservaId,
        usuarioId: data.usuarioId ?? null,
        accion: data.accion,
        campo: data.campo ?? null,
        valorAnterior:
          data.valorAnterior ?? null,
        valorNuevo:
          data.valorNuevo ?? null,
      },
    });
  }
}