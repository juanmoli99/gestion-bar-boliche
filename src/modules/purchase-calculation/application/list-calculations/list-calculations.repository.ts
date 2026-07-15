import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import { ListCalculationsRequestDto } from './dto/list-calculations.request.dto';

@Injectable()
export class ListCalculationsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findMany(
    request: ListCalculationsRequestDto,
  ) {
    const where: any = {};

    if (
      request.fechaDesde ||
      request.fechaHasta
    ) {
      where.fechaDesde = {};

      if (request.fechaDesde) {
        where.fechaDesde.gte =
          new Date(
            `${request.fechaDesde}T00:00:00`,
          );
      }

      if (request.fechaHasta) {
        where.fechaHasta = {
          lte: new Date(
            `${request.fechaHasta}T23:59:59`,
          ),
        };
      }
    }

    if (request.estado) {
      where.estado = request.estado;
    }

    const [total, calculations] =
      await this.prisma.$transaction([
        this.prisma.calculoCompraFiesta.count({
          where,
        }),

        this.prisma.calculoCompraFiesta.findMany({
          where,

          include: {
            reservas: true,
          },

          orderBy: {
            creadoEn: 'desc',
          },

          skip:
            (request.page - 1) *
            request.pageSize,

          take: request.pageSize,
        }),
      ]);

    return {
      total,
      calculations,
    };
  }
}