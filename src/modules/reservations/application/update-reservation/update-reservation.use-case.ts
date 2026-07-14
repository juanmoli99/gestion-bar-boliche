import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  TipoReserva,
} from '../../../../generated/prisma/enums';

import { UpdateReservationRepository } from './update-reservation.repository';
import { UpdateReservationRequestDto } from './dto/update-reservation.request.dto';
import { UpdateReservationResponseDto } from './dto/update-reservation.response.dto';

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    private readonly repository: UpdateReservationRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateReservationRequestDto,
  ): Promise<UpdateReservationResponseDto> {

    const reserva =
      await this.repository.findById(id);

    if (!reserva) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    const data: any = {};

    if (request.nombreCliente !== undefined)
      data.nombreCliente = request.nombreCliente.trim();

    if (request.telefonoCliente !== undefined)
      data.telefonoCliente = request.telefonoCliente.trim();

    if (request.fechaHora !== undefined)
      data.fechaHora = new Date(request.fechaHora);

    if (request.cantidadPersonas !== undefined)
      data.cantidadPersonas = request.cantidadPersonas;

    if (request.observaciones !== undefined)
      data.observaciones = request.observaciones.trim();

    if (reserva.tipo === TipoReserva.MESA) {
      if (request.cantidadMenusSinTacc !== undefined)
        data.cantidadMenusSinTacc =
          request.cantidadMenusSinTacc;
    }

    if (reserva.tipo === TipoReserva.FIESTA) {

      if (request.tipoFiesta !== undefined)
        data.tipoFiesta =
          request.tipoFiesta.trim();

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

    return this.repository.update(
      id,
      data,
    );
  }
}