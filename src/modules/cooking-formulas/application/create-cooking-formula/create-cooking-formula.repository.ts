import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateCookingFormulaItemData {
  itemId: string;
  cantidadPorPersona: number;
}

interface CreateCookingFormulaData {
  nombre: string;
  descripcion?: string;
  items: CreateCookingFormulaItemData[];
}

const cookingFormulaSelect = {
  id: true,
  nombre: true,
  descripcion: true,
  activa: true,
  creadoEn: true,
  actualizadoEn: true,

  items: {
    select: {
      itemId: true,
      cantidadPorPersona: true,

      item: {
        select: {
          id: true,
          nombre: true,
          activo: true,
        },
      },
    },
  },
} as const;

@Injectable()
export class CreateCookingFormulaRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByName(
    nombre: string,
  ) {
    return this.prisma.formulaCocina.findFirst({
      where: {
        nombre,
      },

      select: {
        id: true,
        activa: true,
      },
    });
  }

  async findActiveItemIds(
    ids: string[],
  ) {
    return this.prisma.item.findMany({
      where: {
        id: {
          in: ids,
        },

        activo: true,
      },

      select: {
        id: true,
      },
    });
  }

  async create(
    data: CreateCookingFormulaData,
  ) {
    const formula =
      await this.prisma.formulaCocina.create({
        data: {
          nombre:
            data.nombre,

          descripcion:
            data.descripcion,

          items: {
            create: data.items.map(
              (item) => ({
                itemId:
                  item.itemId,

                cantidadPorPersona:
                  item.cantidadPorPersona,
              }),
            ),
          },
        },

        select:
          cookingFormulaSelect,
      });

    return {
      ...formula,

      items:
        formula.items.map(
          (relation) => ({
            itemId:
              relation.itemId,

            nombreItem:
              relation.item.nombre,

            itemActivo:
              relation.item.activo,

            cantidadPorPersona:
              relation.cantidadPorPersona,
          }),
        ),
    };
  }

  async reactivate(
    id: string,
    data: CreateCookingFormulaData,
  ) {
    const formula =
      await this.prisma.$transaction(
        async (transaction) => {
          await transaction
            .formulaCocinaItem
            .deleteMany({
              where: {
                formulaCocinaId:
                  id,
              },
            });

          return transaction
            .formulaCocina
            .update({
              where: {
                id,
              },

              data: {
                nombre:
                  data.nombre,

                descripcion:
                  data.descripcion,

                activa:
                  true,

                items: {
                  create:
                    data.items.map(
                      (item) => ({
                        itemId:
                          item.itemId,

                        cantidadPorPersona:
                          item.cantidadPorPersona,
                      }),
                    ),
                },
              },

              select:
                cookingFormulaSelect,
            });
        },
      );

    return {
      ...formula,

      items:
        formula.items.map(
          (relation) => ({
            itemId:
              relation.itemId,

            nombreItem:
              relation.item.nombre,

            itemActivo:
              relation.item.activo,

            cantidadPorPersona:
              relation.cantidadPorPersona,
          }),
        ),
    };
  }
}