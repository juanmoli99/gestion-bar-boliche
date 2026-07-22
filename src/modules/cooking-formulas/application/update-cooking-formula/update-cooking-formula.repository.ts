import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

interface UpdateCookingFormulaItemData {
  itemId: string;

  cantidadPorPersona: number;
}

interface UpdateCookingFormulaData {
  formulaId: string;

  nombre: string;

  descripcion?: string;

  items: UpdateCookingFormulaItemData[];
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
export class UpdateCookingFormulaRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  findById(
    id: string,
  ) {
    return this.prisma.formulaCocina.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        activa: true,
      },
    });
  }

  async existsByName(
    nombre: string,
    formulaId: string,
  ): Promise<boolean> {
    const formula =
      await this.prisma.formulaCocina.findFirst({
        where: {
          nombre,

          id: {
            not: formulaId,
          },

          activa: true,
        },

        select: {
          id: true,
        },
      });

    return formula !== null;
  }

  findActiveItemIds(
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

  async save(
    data: UpdateCookingFormulaData,
  ) {
    const formula =
      await this.prisma.$transaction(
        async (transaction) => {
          const existingFormula =
            await transaction.formulaCocina.findUnique({
              where: {
                id: data.formulaId,
              },

              select: {
                id: true,
              },
            });

          if (!existingFormula) {
            return null;
          }

          await transaction.formulaCocinaItem.deleteMany({
            where: {
              formulaCocinaId:
                data.formulaId,
            },
          });

          return transaction.formulaCocina.update({
            where: {
              id: data.formulaId,
            },

            data: {
              nombre:
                data.nombre,

              descripcion:
                data.descripcion,

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

    if (!formula) {
      return null;
    }

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