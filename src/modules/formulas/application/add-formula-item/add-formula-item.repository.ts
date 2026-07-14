import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface AddFormulaItemData {
  versionId: string;
  itemId: string;
  cantidadPorPersona: number;
}

@Injectable()
export class AddFormulaItemRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findActiveVersion(formulaId: string) {
    return this.prisma.formulaVersion.findFirst({
      where: {
        formulaId,
        activa: true,
      },
      orderBy: {
        numeroVersion: 'desc',
      },
      select: {
        id: true,
      },
    });
  }

  async itemExists(id: string) {
    return this.prisma.item.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        activo: true,
      },
    });
  }

  async itemAlreadyAdded(
    versionId: string,
    itemId: string,
  ): Promise<boolean> {
    const detalle =
      await this.prisma.formulaVersionItem.findUnique({
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

    return detalle !== null;
  }

  async create(data: AddFormulaItemData) {
    return this.prisma.formulaVersionItem.create({
      data: {
        versionId: data.versionId,
        itemId: data.itemId,
        cantidadPorPersona: data.cantidadPorPersona,
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