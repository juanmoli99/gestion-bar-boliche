import { Injectable } from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

@Injectable()
export class GetReservationRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  findById(id: string) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        tipo: true,
        estado: true,

        nombreCliente: true,
        telefonoCliente: true,

        fechaHora: true,
        cantidadPersonas: true,
        cantidadMenusSinTacc: true,

        tipoFiesta: true,
        modalidadFiesta: true,

        observaciones: true,
        motivoCancelacion: true,

        precioTotal: true,
        montoSena: true,
        saldoPendiente: true,

        valorPizzaLibreAplicado: true,
        valorMenuSinTaccAplicado: true,
        valorBarraLibreAplicado: true,

        medioPagoSena: true,
        fechaSena: true,
        medioPagoFinal: true,
        fechaPagoFinal: true,

        activa: true,
        creadoEn: true,
        actualizadoEn: true,

        formula: {
          select: {
            id: true,
            nombre: true,
          },
        },

        formulaVersion: {
          select: {
            id: true,
            numeroVersion: true,
          },
        },
      },
    });
  }
}