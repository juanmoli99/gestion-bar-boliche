import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';
import { EstadoCalculoCompra } from '../../../../generated/prisma/enums';

import { CalculationResult } from '../../domain/purchase-calculation.types';

interface SaveCalculationData {
  calculation: CalculationResult;
  usuarioId: string;
  observaciones?: string;
}

@Injectable()
export class SaveCalculationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async save(data: SaveCalculationData) {
    return this.prisma.$transaction(async (tx) => {
      const calculo =
        await tx.calculoCompraFiesta.create({
          data: {
            fechaDesde:
              data.calculation.fechaDesde,
            fechaHasta:
              data.calculation.fechaHasta,
            estado:
              EstadoCalculoCompra.BORRADOR,
            cantidadPersonasTotal:
              data.calculation
                .cantidadPersonasTotal,
            observaciones:
              data.observaciones?.trim(),
            usuarioId: data.usuarioId,
          },
          select: {
            id: true,
            fechaDesde: true,
            fechaHasta: true,
            estado: true,
            cantidadPersonasTotal: true,
            observaciones: true,
            usuarioId: true,
            creadoEn: true,
            actualizadoEn: true,
          },
        });

      if (
        data.calculation.reservas.length > 0
      ) {
        await tx.calculoCompraReserva.createMany({
          data: data.calculation.reservas.map(
            (reserva) => ({
              calculoId: calculo.id,
              reservaId: reserva.reservaId,
              cantidadPersonas:
                reserva.cantidadPersonas,
            }),
          ),
        });

        const detalles =
          data.calculation.reservas.flatMap(
            (reserva) =>
              reserva.items.map((item) => ({
                calculoId: calculo.id,
                reservaId: reserva.reservaId,
                itemId: item.itemId,
                fecha: reserva.fechaHora,
                cantidadCalculada:
                  item.cantidadNecesaria,
                cantidadAjustada: null,
                cantidadPacksCalculada:
                  null,
              })),
          );

        if (detalles.length > 0) {
          await tx.detalleCalculoCompra.createMany({
            data: detalles,
          });
        }
      }

      return calculo;
    });
  }
}