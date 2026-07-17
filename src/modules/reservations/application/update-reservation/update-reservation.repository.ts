import { Injectable } from '@nestjs/common';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

import type {
  Prisma,
} from '../../../../generated/prisma/client';

@Injectable()
export class UpdateReservationRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  findById(
    id: string,
  ) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
    });
  }

  findActiveFormulaVersion(
    formulaId: string,
  ) {
    return this.prisma.formulaVersion.findFirst({
      where: {
        formulaId,
        activa: true,
      },
      orderBy: {
        numeroVersion: 'desc',
      },
      select: {
        id: true,
      },
    });
  }

  findValues() {
    return this.prisma.valores.findUnique({
      where: {
        id: 1,
      },
      select: {
        fiestaBarraLibrePorPersona: true,
      },
    });
  }

  update(
    id: string,
    data: Prisma.ReservaUpdateInput,
  ) {
    return this.prisma.reserva.update({
      where: {
        id,
      },
      data,
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

        formulaId: true,
        formulaVersionId: true,

        observaciones: true,

        precioTotal: true,
        montoSena: true,
        saldoPendiente: true,

        valorPizzaLibreAplicado: true,
        valorMenuSinTaccAplicado: true,
        valorBarraLibreAplicado: true,

        actualizadoEn: true,
      },
    });
  }
}