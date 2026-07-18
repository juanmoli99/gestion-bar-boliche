import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateSalaryPositionData {
  nombre: string;
  valorHora: number;
}

@Injectable()
export class CreateSalaryPositionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByName(
    nombre: string,
  ) {
    return this.prisma.puestoTrabajo.findFirst({
      where: {
        nombre,
      },

      select: {
        id: true,
        activo: true,
      },
    });
  }

  async create(
    data: CreateSalaryPositionData,
  ) {
    return this.prisma.puestoTrabajo.create({
      data: {
        nombre: data.nombre,
        valorHora: data.valorHora,
      },

      select: {
        id: true,
        nombre: true,
        valorHora: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }

  async reactivate(
    id: string,
    data: CreateSalaryPositionData,
  ) {
    return this.prisma.puestoTrabajo.update({
      where: {
        id,
      },

      data: {
        nombre: data.nombre,
        valorHora: data.valorHora,
        activo: true,
      },

      select: {
        id: true,
        nombre: true,
        valorHora: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}