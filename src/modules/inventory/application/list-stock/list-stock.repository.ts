import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import { TipoInventario } from '../../../../generated/prisma/enums';

@Injectable()
export class ListStockRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    inventario: TipoInventario | null,
  ) {
    return this.prisma.stock.findMany({
      where: {
        ...(inventario && {
          inventario,
        }),

        item: {
          activo: true,
        },
      },

      orderBy: [
        {
          inventario: 'asc',
        },
        {
          item: {
            nombre: 'asc',
          },
        },
      ],

      select: {
        id: true,
        itemId: true,
        inventario: true,
        cantidadActual: true,
        cantidadMinima: true,
        creadoEn: true,
        actualizadoEn: true,

        item: {
          select: {
            nombre: true,

            categoria: {
              select: {
                nombre: true,
              },
            },

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