import { Injectable } from '@nestjs/common';

import {
  Prisma,
} from '../../../../generated/prisma/client';

import {
  ListReservationsRepository,
} from './list-reservations.repository';

import {
  ListReservationsRequestDto,
} from './dto/list-reservations.request.dto';

import {
  ListReservationsResponseDto,
} from './dto/list-reservations.response.dto';

@Injectable()
export class ListReservationsUseCase {
  constructor(
    private readonly repository:
      ListReservationsRepository,
  ) {}

  async execute(
    request: ListReservationsRequestDto,
  ): Promise<ListReservationsResponseDto[]> {
    const where:
      Prisma.ReservaWhereInput = {};

    if (request.tipo) {
      where.tipo = request.tipo;
    }

    if (request.estado) {
      where.estado = request.estado;
    }

    if (request.nombreCliente) {
      where.nombreCliente = {
        contains:
          request.nombreCliente,

        mode: 'insensitive',
      };
    }

    if (
      request.fechaDesde ||
      request.fechaHasta
    ) {
      where.fechaHora = {};

      if (request.fechaDesde) {
        where.fechaHora.gte =
          new Date(
            request.fechaDesde,
          );
      }

      if (request.fechaHasta) {
        where.fechaHora.lte =
          new Date(
            request.fechaHasta,
          );
      }
    }

    const reservas =
      await this.repository.findAll(
        where,
      );

    return reservas.map(
      (reserva) => ({
        id:
          reserva.id,

        tipo:
          reserva.tipo,

        estado:
          reserva.estado,

        nombreCliente:
          reserva.nombreCliente,

        telefonoCliente:
          reserva.telefonoCliente,

        fechaHora:
          reserva.fechaHora,

        cantidadPersonas:
          reserva.cantidadPersonas,

        nombreFormula:
          reserva.formula?.nombre ??
          null,

        modalidadFiesta:
          reserva.modalidadFiesta,

        observaciones:
          reserva.observaciones,
      }),
    );
  }
}