import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  TipoInventario,
  TipoItem,
} from '../../../../generated/prisma/enums';

interface CreateItemData {
  nombre: string;
  descripcion?: string;

  inventario: TipoInventario;
  tipo: TipoItem;

  categoriaId: string;
  unidadMedidaId: string;

  unidadesPorPack?: number;

  cantidadActual?: number;
  cantidadMinima?: number;
}

@Injectable()
export class CreateItemRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findByNameAndType(
    nombre: string,
    tipo: TipoItem,
  ) {
    return this.prisma.item.findUnique({
      where: {
        nombre_tipo: {
          nombre,
          tipo,
        },
      },

      select: {
        id: true,
        activo: true,
      },
    });
  }

  async categoriaPerteneceAlInventario(
    categoriaId: string,
    inventario: TipoInventario,
  ): Promise<boolean> {
    const categoria =
      await this.prisma.categoria.findFirst({
        where: {
          id: categoriaId,
          inventario,
          activa: true,
        },

        select: {
          id: true,
        },
      });

    return categoria !== null;
  }

  async create(
    data: CreateItemData,
  ) {
    return this.prisma.$transaction(
      async (transaction) => {
        const item =
          await transaction.item.create({
            data: {
              nombre:
                data.nombre,

              descripcion:
                data.descripcion,

              tipo:
                data.tipo,

              categoriaId:
                data.categoriaId,

              unidadMedidaId:
                data.unidadMedidaId,

              unidadesPorPack:
                data.unidadesPorPack,
            },

            select: {
              id: true,
              nombre: true,
              descripcion: true,
              tipo: true,
              categoriaId: true,
              unidadMedidaId: true,
              unidadesPorPack: true,
              activo: true,
              creadoEn: true,
              actualizadoEn: true,
            },
          });

        const stock =
          await transaction.stock.create({
            data: {
              itemId:
                item.id,

              inventario:
                data.inventario,

              cantidadActual:
                data.cantidadActual ??
                0,

              cantidadMinima:
                data.cantidadMinima ??
                null,
            },

            select: {
              id: true,
              itemId: true,
              inventario: true,
              cantidadActual: true,
              cantidadMinima: true,
              creadoEn: true,
              actualizadoEn: true,
            },
          });

        return {
          ...item,
          stock,
        };
      },
    );
  }

  async reactivate(
    id: string,
    data: CreateItemData,
  ) {
    return this.prisma.$transaction(
      async (transaction) => {
        const item =
          await transaction.item.update({
            where: {
              id,
            },

            data: {
              nombre:
                data.nombre,

              descripcion:
                data.descripcion ??
                null,

              tipo:
                data.tipo,

              categoriaId:
                data.categoriaId,

              unidadMedidaId:
                data.unidadMedidaId,

              unidadesPorPack:
                data.unidadesPorPack ??
                null,

              activo:
                true,
            },

            select: {
              id: true,
              nombre: true,
              descripcion: true,
              tipo: true,
              categoriaId: true,
              unidadMedidaId: true,
              unidadesPorPack: true,
              activo: true,
              creadoEn: true,
              actualizadoEn: true,
            },
          });

        /*
         * El flujo de creación administra una única
         * zona de stock por ítem. Se eliminan posibles
         * registros antiguos de otras zonas.
         */
        await transaction.stock.deleteMany({
          where: {
            itemId:
              id,

            inventario: {
              not:
                data.inventario,
            },
          },
        });

        const stock =
          await transaction.stock.upsert({
            where: {
              itemId_inventario: {
                itemId:
                  id,

                inventario:
                  data.inventario,
              },
            },

            update: {
              cantidadActual:
                data.cantidadActual ??
                0,

              cantidadMinima:
                data.cantidadMinima ??
                null,
            },

            create: {
              itemId:
                id,

              inventario:
                data.inventario,

              cantidadActual:
                data.cantidadActual ??
                0,

              cantidadMinima:
                data.cantidadMinima ??
                null,
            },

            select: {
              id: true,
              itemId: true,
              inventario: true,
              cantidadActual: true,
              cantidadMinima: true,
              creadoEn: true,
              actualizadoEn: true,
            },
          });

        return {
          ...item,
          stock,
        };
      },
    );
  }
}