import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoReserva,
  TipoInventario,
  TipoReserva,
} from '../../../../generated/prisma/enums';

@Injectable()
export class CalculatePizzaProductionRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findReservations(
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    return this.prisma.reserva.findMany({
      where: {
        tipo: TipoReserva.MESA,
        estado: EstadoReserva.SENADA,
        activa: true,
        fechaHora: {
          gte: fechaDesde,
          lte: fechaHasta,
        },
      },

      include: {
        formulaCocina: {
          include: {
            items: {
              include: {
                item: {
                  include: {
                    stocks: {
                      where: {
                        inventario:
                          TipoInventario.COCINA,
                      },
                    },

                    unidadMedida: true,
                  },
                },
              },
            },
          },
        },
      },

      orderBy: {
        fechaHora: 'asc',
      },
    });
  }

  findProductionConfiguration() {
    return this.prisma
      .configuracionProduccionPizza
      .findUnique({
        where: {
          id: 1,
        },

        include: {
          itemPizzaElaborada: {
            include: {
              stocks: {
                where: {
                  inventario:
                    TipoInventario.COCINA,
                },
              },

              unidadMedida: true,
            },
          },
        },
      });
  }
}