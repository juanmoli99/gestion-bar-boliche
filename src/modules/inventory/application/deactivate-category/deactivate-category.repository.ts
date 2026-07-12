import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeactivateCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.categoria.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  async deactivate(id: string) {
    return this.prisma.categoria.update({
      where: { id },
      data: {
        activa: false,
      },
    });
  }
}