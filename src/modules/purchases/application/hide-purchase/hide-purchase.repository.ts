import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

@Injectable()
export class HidePurchaseRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async hide(
    purchaseId: string,
  ) {
    return this.prisma.compra.update({
      where: {
        id: purchaseId,
      },

      data: {
        visibleEnCompras: false,
      },

      select: {
        id: true,
        visibleEnCompras: true,
      },
    });
  }
}