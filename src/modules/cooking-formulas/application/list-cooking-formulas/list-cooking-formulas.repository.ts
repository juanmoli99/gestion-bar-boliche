import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListCookingFormulasRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute() {
    return this.prisma.formulaCocina.findMany({
      where: {
        activa: true,
      },

      include: {
        items: {
          include: {
            item: true,
          },
        },
      },

      orderBy: {
        nombre: 'asc',
      },
    });
  }
}