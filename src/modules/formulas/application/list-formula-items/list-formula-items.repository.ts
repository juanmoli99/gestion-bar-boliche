import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListFormulaItemsRepository {
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

  async findAll(versionId: string) {
    return this.prisma.formulaVersionItem.findMany({
      where: {
        versionId,
      },
      orderBy: {
        creadoEn: 'asc',
      },
      select: {
        id: true,
        itemId: true,
        cantidadPorPersona: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
        item: {
          select: {
            nombre: true,
            unidadesPorPack: true,
            unidadMedida: {
              select: {
                nombre: true,
                abreviatura: true,
              },
            },
          },
        },
      },
    });
  }
}