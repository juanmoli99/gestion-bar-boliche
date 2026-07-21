import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeleteFreeBarRateRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.tarifaBarraLibre.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tarifaBarraLibre.update({
      where: {
        id,
      },
      data: {
        activa: false,
      },
    });
  }
}