import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class UpdateFormulaVersionItemRepository {
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
    });
  }

  async update(
    versionId: string,
    itemId: string,
    cantidadPorPersona: number,
  ) {
    return this.prisma.formulaVersionItem.update({
      where: {
        versionId_itemId: {
          versionId,
          itemId,
        },
      },
      data: {
        cantidadPorPersona,
      },
      select: {
        id: true,
        versionId: true,
        itemId: true,
        cantidadPorPersona: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}