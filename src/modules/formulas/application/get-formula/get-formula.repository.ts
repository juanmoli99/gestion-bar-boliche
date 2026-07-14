import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class GetFormulaRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.formulaCompra.findUnique({
      where: {
        id,
      },
      include: {
        versiones: {
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
        },
      },
    });
  }
}