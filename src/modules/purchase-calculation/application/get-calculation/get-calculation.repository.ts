import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class GetCalculationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findById(
    id: string,
  ) {
    return this.prisma.calculoCompraFiesta.findUnique({
      where: {
        id,
      },

      include: {
        reservas: true,

        detalles: true,
      },
    });
  }
}