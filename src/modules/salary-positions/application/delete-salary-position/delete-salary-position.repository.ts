import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeleteSalaryPositionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.puestoTrabajo.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.puestoTrabajo.delete({
      where: {
        id,
      },
    });
  }
}