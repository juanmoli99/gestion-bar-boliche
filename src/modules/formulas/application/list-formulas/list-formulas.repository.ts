import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListFormulasRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    const formulas =
      await this.prisma.formulaCompra.findMany({
        orderBy: {
          nombre: 'asc',
        },
        include: {
          versiones: {
            where: {
              activa: true,
            },
            include: {
              _count: {
                select: {
                  items: true,
                },
              },
            },
          },
        },
      });

    return formulas;
  }
}