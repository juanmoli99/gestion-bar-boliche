import { Injectable } from '@nestjs/common';

import { ReservationHistoryRepository } from './reservation-history.repository';

interface RegisterReservationHistoryParams {
  reservaId: string;
  usuarioId?: string | null;
  accion: string;
  campo?: string | null;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
}

@Injectable()
export class ReservationHistoryService {
  constructor(
    private readonly repository: ReservationHistoryRepository,
  ) {}

  async register(
    params: RegisterReservationHistoryParams,
  ): Promise<void> {
    await this.repository.create({
      reservaId: params.reservaId,
      usuarioId: params.usuarioId ?? null,
      accion: params.accion,
      campo: params.campo ?? null,
      valorAnterior:
        params.valorAnterior ?? null,
      valorNuevo:
        params.valorNuevo ?? null,
    });
  }
}