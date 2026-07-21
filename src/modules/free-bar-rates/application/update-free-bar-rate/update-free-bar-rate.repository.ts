import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateFreeBarRateData {
  nombre?: string;
  valorPersona?: number;
}

@Injectable()
export class UpdateFreeBarRateRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.tarifaBarraLibre.findUnique({
      where: {
        id,
      },
    });
  }

  async exists(
    nombre: string,
    excludeId: string,
  ): Promise<boolean> {
    const tarifa = await this.prisma.tarifaBarraLibre.findFirst({
      where: {
        id: {
          not: excludeId,
        },
        nombre,
      },
      select: {
        id: true,
      },
    });

    return tarifa !== null;
  }

  async update(
    id: string,
    data: UpdateFreeBarRateData,
  ) {
    return this.prisma.tarifaBarraLibre.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        nombre: true,
        valorPersona: true,
        activa: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}