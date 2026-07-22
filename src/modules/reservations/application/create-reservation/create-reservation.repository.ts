import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  Decimal,
} from '../../../../generated/prisma/internal/prismaNamespace';

import {
  ModalidadFiesta,
  TipoReserva,
} from '../../../../generated/prisma/enums';

interface CreateReservationData {
  tipo: TipoReserva;
  nombreCliente: string;
  telefonoCliente?: string;
  fechaHora: Date;
  cantidadPersonas: number;
  cantidadMenusSinTacc?: number;

  tipoFiesta?: string;
  modalidadFiesta?: ModalidadFiesta;

  observaciones?: string;
  formulaId?: string;
  formulaVersionId?: string;
  formulaCocinaId?: string;
  tarifaBarraLibreId?: string;

  precioTotal: Decimal;
  montoSena?: Decimal;
  saldoPendiente: Decimal;

  valorPizzaLibreAplicado?: Decimal;
  valorMenuSinTaccAplicado?: Decimal;
  valorBarraLibreAplicado?: Decimal;

  usuarioCreadorId: string;
  usuarioActualizadorId: string;
}

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

    async findActiveCookingFormula(
    formulaCocinaId: string,
  ) {
    return this.prisma.formulaCocina.findFirst({
      where: {
        id: formulaCocinaId,
        activa: true,
      },
      select: {
        id: true,
      },
    });
  }

    async findFreeBarRate(
    tarifaBarraLibreId: string,
  ) {
    return this.prisma.tarifaBarraLibre.findFirst({
      where: {
        id: tarifaBarraLibreId,
        activa: true,
      },
      select: {
        id: true,
        valorPersona: true,
      },
    });
  }

  async findValues() {
    return this.prisma.valores.findUnique({
      where: {
        id: 1,
      },
      select: {
        pizzaLibreGeneral: true,
        pizzaLibreViernes: true,
        pizzaLibreSabado: true,
        menuSinTacc: true,
      },
    });
  }

  async create(
    data: CreateReservationData,
  ) {
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
        modalidadFiesta: true,

        formulaId: true,
        formulaVersionId: true,
        formulaCocinaId: true,
        tarifaBarraLibreId: true,
        observaciones: true,

        precioTotal: true,
        montoSena: true,
        saldoPendiente: true,

        valorPizzaLibreAplicado: true,
        valorMenuSinTaccAplicado: true,
        valorBarraLibreAplicado: true,

        creadoEn: true,
      },
    });
  }
}