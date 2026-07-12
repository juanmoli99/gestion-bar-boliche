import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeletePurchaseItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findDetail(id: string) {
    return this.prisma.compraDetalle.findUnique({
      where: { id },
      select: {
        id: true,
        compra: {
          select: {
            estado: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    await this.prisma.compraDetalle.delete({
      where: {
        id,
      },
    });
  }
}