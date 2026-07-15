import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GetCalculationRepository } from './get-calculation.repository';

import { GetCalculationResponseDto } from './dto/get-calculation.response.dto';

@Injectable()
export class GetCalculationUseCase {
  constructor(
    private readonly repository: GetCalculationRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<GetCalculationResponseDto> {

    const calculation =
      await this.repository.findById(id);

    if (!calculation) {
      throw new NotFoundException(
        'El cálculo no existe.',
      );
    }

    return {

      id: calculation.id,

      fechaDesde:
        calculation.fechaDesde,

      fechaHasta:
        calculation.fechaHasta,

      estado:
        calculation.estado,

      cantidadPersonasTotal:
        calculation.cantidadPersonasTotal,

      observaciones:
        calculation.observaciones,

      creadoEn:
        calculation.creadoEn,

      actualizadoEn:
        calculation.actualizadoEn,

      reservas:
        calculation.reservas.map(
          (reserva) => ({
            reservaId:
              reserva.reservaId,

            cantidadPersonas:
              reserva.cantidadPersonas,
          }),
        ),

      items:
        calculation.detalles.map(
          (detalle) => ({
            itemId:
              detalle.itemId,

            cantidadCalculada:
              Number(
                detalle.cantidadCalculada,
              ),

            cantidadAjustada:
              detalle.cantidadAjustada ===
              null
                ? null
                : Number(
                    detalle.cantidadAjustada,
                  ),

            cantidadPacksCalculada:
              detalle.cantidadPacksCalculada,

            fecha:
              detalle.fecha,
          }),
        ),

    };
  }
}