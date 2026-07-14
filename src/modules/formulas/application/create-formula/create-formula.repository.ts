import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateFormulaData {
  nombre: string;
  descripcion?: string;
}

@Injectable()
export class CreateFormulaRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async existsByName(
    nombre: string,
  ): Promise<boolean> {
    const formula =
      await this.prisma.formulaCompra.findUnique({
        where: {
          nombre,
        },
        select: {
          id: true,
        },
      });

    return formula !== null;
  }

  async create(data: CreateFormulaData) {
    return this.prisma.$transaction(async (tx) => {
      const formula =
        await tx.formulaCompra.create({
          data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
          },
        });

      await tx.formulaVersion.create({
        data: {
          formulaId: formula.id,
          numeroVersion: 1,
          activa: true,
        },
      });

      return tx.formulaCompra.findUniqueOrThrow({
        where: {
          id: formula.id,
        },
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          activa: true,
          creadoEn: true,
          actualizadoEn: true,
        },
      });
    });
  }
}