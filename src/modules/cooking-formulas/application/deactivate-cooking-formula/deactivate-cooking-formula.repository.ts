import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

const cookingFormulaSelect = {
  id: true,
  nombre: true,
  descripcion: true,
  pizzasNormalesPorPersona: true,
  activa: true,
  creadoEn: true,
  actualizadoEn: true,

  items: {
    select: {
      itemId: true,
      cantidadPorPersona: true,

      item: {
        select: {
          nombre: true,
          activo: true,
        },
      },
    },
  },
} as const;

@Injectable()
export class DeactivateCookingFormulaRepository {
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

  async deactivate(
    id: string,
  ) {
    const formula =
      await this.prisma.formulaCocina.update({
        where: {
          id,
        },

        data: {
          activa: false,
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
}