import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeleteFormulaVersionItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findVersion(versionId: string) {
    return this.prisma.formulaVersion.findUnique({
      where: {
        id: versionId,
      },
      select: {
        id: true,
        activa: true,
      },
    });
  }

  async findItem(
    versionId: string,
    itemId: string,
  ) {
    return this.prisma.formulaVersionItem.findUnique({
      where: {
        versionId_itemId: {
          versionId,
          itemId,
        },
      },
      select: {
        id: true,
      },
    });
  }

  async delete(
    versionId: string,
    itemId: string,
  ) {
    await this.prisma.formulaVersionItem.delete({
      where: {
        versionId_itemId: {
          versionId,
          itemId,
        },
      },
    });
  }
}