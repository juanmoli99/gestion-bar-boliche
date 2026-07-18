import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

interface UpdateFormulaItemData {
  itemId: string;
  cantidadPorPersona: number;
}

interface SaveFormulaData {
  formulaId: string;
  nombre: string;
  descripcion: string | null;
  items: UpdateFormulaItemData[];
}

@Injectable()
export class UpdateFormulaRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  findById(id: string) {
    return this.prisma.formulaCompra.findUnique({
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
      await this.prisma.formulaCompra.findFirst({
        where: {
          nombre,
          id: {
            not: formulaId,
          },
        },
        select: {
          id: true,
        },
      });

    return formula !== null;
  }

  findActiveItems(
    itemIds: string[],
  ) {
    return this.prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
        activo: true,
      },
      select: {
        id: true,
      },
    });
  }

  async save(
    data: SaveFormulaData,
  ) {
    return this.prisma.$transaction(
      async (tx) => {
        const formulaActual =
          await tx.formulaCompra.findUnique({
            where: {
              id: data.formulaId,
            },
            select: {
              id: true,

              versiones: {
                orderBy: {
                  numeroVersion: 'desc',
                },

                take: 1,

                select: {
                  numeroVersion: true,
                },
              },
            },
          });

        if (!formulaActual) {
          return null;
        }

        const ultimaVersion =
          formulaActual.versiones[0]
            ?.numeroVersion ?? 0;

        const formula =
          await tx.formulaCompra.update({
            where: {
              id: data.formulaId,
            },
            data: {
              nombre: data.nombre,
              descripcion:
                data.descripcion,
            },
            select: {
              id: true,
              nombre: true,
              descripcion: true,
              activa: true,
              actualizadoEn: true,
            },
          });

        await tx.formulaVersion.updateMany({
          where: {
            formulaId:
              data.formulaId,
            activa: true,
          },
          data: {
            activa: false,
          },
        });

        const nuevaVersion =
          await tx.formulaVersion.create({
            data: {
              formulaId:
                data.formulaId,

              numeroVersion:
                ultimaVersion + 1,

              activa: true,
            },
          });

        await tx.formulaVersionItem.createMany({
          data: data.items.map(
            (item) => ({
              versionId:
                nuevaVersion.id,

              itemId:
                item.itemId,

              cantidadPorPersona:
                item.cantidadPorPersona,

              activo: true,
            }),
          ),
        });

        const version =
          await tx.formulaVersion.findUniqueOrThrow({
            where: {
              id: nuevaVersion.id,
            },

            include: {
              items: {
                orderBy: {
                  creadoEn: 'asc',
                },

                include: {
                  item: {
                    select: {
                      nombre: true,

                      unidadMedida: {
                        select: {
                          nombre: true,
                          abreviatura: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

        return {
          formula,
          version,
        };
      },
    );
  }
}