import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateSalaryPositionData {
  nombre?: string;
  valorHora?: number;
}

@Injectable()
export class UpdateSalaryPositionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.puestoTrabajo.findUnique({
      where: {
        id,
      },
    });
  }

  async exists(
    nombre: string,
    excludeId: string,
  ): Promise<boolean> {
    const puesto = await this.prisma.puestoTrabajo.findFirst({
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

    return puesto !== null;
  }

  async update(
    id: string,
    data: UpdateSalaryPositionData,
  ) {
    return this.prisma.puestoTrabajo.update({
      where: {
        id,
      },
      data,
    });
  }
}