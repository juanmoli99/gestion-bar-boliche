import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class CreateReservationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findFormulaVersion(
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

  async create(data: {
    tipo: any;
    nombreCliente: string;
    telefonoCliente?: string;
    fechaHora: Date;
    cantidadPersonas: number;
    cantidadMenusSinTacc?: number;
    tipoFiesta?: string;
    observaciones?: string;
    formulaId?: string;
    formulaVersionId?: string;
  }) {
    return this.prisma.reserva.create({
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
        formulaId: true,
        formulaVersionId: true,
        observaciones: true,
        creadoEn: true,
      },
    });
  }
}