import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  TipoReserva,
} from '../../../../generated/prisma/enums';

import { ReservationHistoryComparer } from '../reservation-history/helpers/reservation-history-comparer';
import { ReservationHistoryService } from '../reservation-history/reservation-history.service';
import { UpdateReservationRepository } from './update-reservation.repository';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';
import { UpdateReservationResponseDto } from './dto/update-reservation.response.dto';

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    private readonly repository: UpdateReservationRepository,
    private readonly historyService: ReservationHistoryService,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationRequestDto,
    usuarioId: string,
  ): Promise<UpdateReservationResponseDto> {
    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    const data: Record<string, unknown> = {
      usuarioActualizadorId: usuarioId,
    };

    if (request.nombreCliente !== undefined) {
      data.nombreCliente =
        request.nombreCliente.trim();
    }

    if (request.telefonoCliente !== undefined) {
      data.telefonoCliente =
        request.telefonoCliente.trim();
    }

    if (request.fechaHora !== undefined) {
      data.fechaHora =
        new Date(request.fechaHora);
    }

    if (request.cantidadPersonas !== undefined) {
      data.cantidadPersonas =
        request.cantidadPersonas;
    }

    if (request.observaciones !== undefined) {
      data.observaciones =
        request.observaciones.trim();
    }

    if (reserva.tipo === TipoReserva.MESA) {
      if (
        request.cantidadMenusSinTacc !==
        undefined
      ) {
        data.cantidadMenusSinTacc =
          request.cantidadMenusSinTacc;
      }
    }

    if (reserva.tipo === TipoReserva.FIESTA) {
      if (request.tipoFiesta !== undefined) {
        data.tipoFiesta =
          request.tipoFiesta.trim();
      }

      if (request.formulaId !== undefined) {
        const version =
          await this.repository.findActiveFormulaVersion(
            request.formulaId,
          );

        if (!version) {
          throw new BadRequestException(
            'La fórmula no tiene una versión activa.',
          );
        }

        data.formulaId = request.formulaId;
        data.formulaVersionId = version.id;
      }
    }

    const updatedReservation =
      await this.repository.update(
        id,
        data,
      );

    const camposModificados = Object.keys(data)
      .filter(
        (campo) =>
          campo !== 'usuarioActualizadorId',
      );

    const valoresAnteriores: Record<
      string,
      unknown
    > = {};

    const valoresNuevos: Record<
      string,
      unknown
    > = {};

    for (const campo of camposModificados) {
      valoresAnteriores[campo] =
        reserva[
          campo as keyof typeof reserva
        ];

      valoresNuevos[campo] =
        updatedReservation[
          campo as keyof typeof updatedReservation
        ];
    }

    const cambios =
      ReservationHistoryComparer.compare(
        valoresAnteriores,
        valoresNuevos,
      );

    for (const cambio of cambios) {
      await this.historyService.register({
        reservaId: id,
        usuarioId,
        accion: 'RESERVA_ACTUALIZADA',
        campo: cambio.campo,
        valorAnterior:
          cambio.valorAnterior,
        valorNuevo:
          cambio.valorNuevo,
      });
    }

    return updatedReservation;
  }
}