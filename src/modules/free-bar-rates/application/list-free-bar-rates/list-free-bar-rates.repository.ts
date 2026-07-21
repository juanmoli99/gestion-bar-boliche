import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListFreeBarRatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.tarifaBarraLibre.findMany({
      where: {
        activa: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}