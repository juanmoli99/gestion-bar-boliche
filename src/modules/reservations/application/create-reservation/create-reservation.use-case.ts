import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  TipoReserva,
} from '../../../../generated/prisma/enums';

import { CreateReservationRepository } from './create-reservation.repository';
import { CreateReservationRequestDto } from './dto/create-reservation.request.dto';
import { CreateReservationResponseDto } from './dto/create-reservation.response.dto';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly repository: CreateReservationRepository,
  ) {}

  async execute(
    request: CreateReservationRequestDto,
  ): Promise<CreateReservationResponseDto> {
    let formulaVersionId: string | undefined;

    if (request.tipo === TipoReserva.FIESTA) {
      if (!request.formulaId) {
        throw new BadRequestException(
          'Debe seleccionar una fórmula.',
        );
      }

      const version =
        await this.repository.findFormulaVersion(
          request.formulaId,
        );

      if (!version) {
        throw new BadRequestException(
          'La fórmula no posee una versión activa.',
        );
      }

      formulaVersionId = version.id;
    }

    return this.repository.create({
      tipo: request.tipo,
      nombreCliente: request.nombreCliente.trim(),
      telefonoCliente: request.telefonoCliente?.trim(),
      fechaHora: new Date(request.fechaHora),
      cantidadPersonas: request.cantidadPersonas,
      cantidadMenusSinTacc:
        request.tipo === TipoReserva.MESA
          ? request.cantidadMenusSinTacc
          : undefined,
      tipoFiesta:
        request.tipo === TipoReserva.FIESTA
          ? request.tipoFiesta?.trim()
          : undefined,
      observaciones:
        request.observaciones?.trim(),
      formulaId:
        request.tipo === TipoReserva.FIESTA
          ? request.formulaId
          : undefined,
      formulaVersionId,
    });
  }
}