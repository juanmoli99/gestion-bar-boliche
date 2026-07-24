import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import {
  EstadoReserva,
  TipoInventario,
  TipoReserva,
} from '../../../../generated/prisma/enums';

@Injectable()
export class CalculateDinnerShoppingListRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findDinnerReservations(
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    return this.prisma.reserva.findMany({
      where: {
        tipo:
          TipoReserva.MESA,

        estado:
          EstadoReserva.SENADA,

        formulaCocinaId: {
          not: null,
        },

        fechaHora: {
          gte: fechaDesde,
          lte: fechaHasta,
        },
      },

      select: {
        id: true,
        nombreCliente: true,
        fechaHora: true,
        cantidadPersonas: true,
        formulaCocinaId: true,

        formulaCocina: {
          select: {
            id: true,
            nombre: true,

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
          },
        },
      },

      orderBy: {
        fechaHora:
          'asc',
      },
    });
  }

  async findItemsWithKitchenStock(
    itemIds: string[],
  ) {
    return this.prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },

      select: {
        id: true,
        nombre: true,
        proveedorId: true,
        ultimoCosto: true,
        unidadesPorPack: true,

        unidadMedida: {
          select: {
            nombre: true,
            abreviatura: true,
            permiteDecimal: true,
          },
        },

        stocks: {
          where: {
            inventario:
              TipoInventario.COCINA,
          },

          select: {
            inventario: true,
            cantidadActual: true,
          },
        },
      },
    });
  }
}