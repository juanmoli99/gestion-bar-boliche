import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListSalaryPositionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.puestoTrabajo.findMany({
      where: {
        activo: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}