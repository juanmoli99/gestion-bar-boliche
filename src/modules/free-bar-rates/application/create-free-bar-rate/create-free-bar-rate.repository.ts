import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateFreeBarRateData {
  nombre: string;
  valorPersona: number;
}

@Injectable()
export class CreateFreeBarRateRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByName(
    nombre: string,
  ) {
    return this.prisma.tarifaBarraLibre.findFirst({
      where: {
        nombre,
      },

      select: {
        id: true,
        activa: true,
      },
    });
  }

  async create(
    data: CreateFreeBarRateData,
  ) {
    return this.prisma.tarifaBarraLibre.create({
      data: {
        nombre: data.nombre,
        valorPersona: data.valorPersona,
      },

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

  async reactivate(
    id: string,
    data: CreateFreeBarRateData,
  ) {
    return this.prisma.tarifaBarraLibre.update({
      where: {
        id,
      },

      data: {
        nombre: data.nombre,
        valorPersona: data.valorPersona,
        activa: true,
      },

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