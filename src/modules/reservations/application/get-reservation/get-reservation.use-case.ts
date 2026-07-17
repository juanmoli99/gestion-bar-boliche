import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  GetReservationRepository,
} from './get-reservation.repository';

import {
  GetReservationResponseDto,
} from './dto/get-reservation.response.dto';

@Injectable()
export class GetReservationUseCase {
  constructor(
    private readonly repository:
      GetReservationRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<GetReservationResponseDto> {
    const reservation =
      await this.repository.findById(id);

    if (!reservation) {
      throw new NotFoundException(
        'La reserva no existe.',
      );
    }

    return {
      id:
        reservation.id,

      tipo:
        reservation.tipo,

      estado:
        reservation.estado,

      nombreCliente:
        reservation.nombreCliente,

      telefonoCliente:
        reservation.telefonoCliente,

      fechaHora:
        reservation.fechaHora,

      cantidadPersonas:
        reservation.cantidadPersonas,

      cantidadMenusSinTacc:
        reservation.cantidadMenusSinTacc,

      tipoFiesta:
        reservation.tipoFiesta,

      modalidadFiesta:
        reservation.modalidadFiesta,

      observaciones:
        reservation.observaciones,

      motivoCancelacion:
        reservation.motivoCancelacion,

      precioTotal:
        reservation.precioTotal,

      montoSena:
        reservation.montoSena,

      saldoPendiente:
        reservation.saldoPendiente,

      valorPizzaLibreAplicado:
        reservation.valorPizzaLibreAplicado,

      valorMenuSinTaccAplicado:
        reservation.valorMenuSinTaccAplicado,

      valorBarraLibreAplicado:
        reservation.valorBarraLibreAplicado,

      medioPagoSena:
        reservation.medioPagoSena,

      fechaSena:
        reservation.fechaSena,

      medioPagoFinal:
        reservation.medioPagoFinal,

      fechaPagoFinal:
        reservation.fechaPagoFinal,

      formula:
        reservation.formula &&
        reservation.formulaVersion
          ? {
              id:
                reservation.formula.id,

              nombre:
                reservation.formula.nombre,

              versionId:
                reservation.formulaVersion.id,

              numeroVersion:
                reservation.formulaVersion
                  .numeroVersion,
            }
          : null,

      activa:
        reservation.activa,

      creadoEn:
        reservation.creadoEn,

      actualizadoEn:
        reservation.actualizadoEn,
    };
  }
}