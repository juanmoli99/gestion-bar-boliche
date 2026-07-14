import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class CreateFormulaVersionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(formulaId: string) {
    return this.prisma.$transaction(async (tx) => {
      const formula =
        await tx.formulaCompra.findUnique({
          where: {
            id: formulaId,
          },
        });

      if (!formula) {
        return null;
      }

      const ultimaVersion =
        await tx.formulaVersion.findFirst({
          where: {
            formulaId,
            activa: true,
          },
          orderBy: {
            numeroVersion: 'desc',
          },
          include: {
            items: true,
          },
        });

      if (!ultimaVersion) {
        return null;
      }

      await tx.formulaVersion.update({
        where: {
          id: ultimaVersion.id,
        },
        data: {
          activa: false,
        },
      });

      const nuevaVersion =
        await tx.formulaVersion.create({
          data: {
            formulaId,
            numeroVersion:
              ultimaVersion.numeroVersion + 1,
            activa: true,
          },
        });

      if (ultimaVersion.items.length > 0) {
        await tx.formulaVersionItem.createMany({
          data: ultimaVersion.items.map(
            (item) => ({
              versionId: nuevaVersion.id,
              itemId: item.itemId,
              cantidadPorPersona:
                item.cantidadPorPersona,
              activo: item.activo,
            }),
          ),
        });
      }

      return nuevaVersion;
    });
  }
}