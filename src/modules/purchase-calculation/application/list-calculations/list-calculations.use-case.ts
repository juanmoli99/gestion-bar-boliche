import { Injectable } from '@nestjs/common';

import { ListCalculationsRepository } from './list-calculations.repository';

import { ListCalculationsRequestDto } from './dto/list-calculations.request.dto';
import { ListCalculationsResponseDto } from './dto/list-calculations.response.dto';

@Injectable()
export class ListCalculationsUseCase {
  constructor(
    private readonly repository: ListCalculationsRepository,
  ) {}

  async execute(
    request: ListCalculationsRequestDto,
  ): Promise<ListCalculationsResponseDto> {

    const result =
      await this.repository.findMany(
        request,
      );

    return {
      total: result.total,

      page: request.page,

      pageSize: request.pageSize,

      data:
        result.calculations.map(
          (item) => ({
            id: item.id,

            fechaDesde:
              item.fechaDesde,

            fechaHasta:
              item.fechaHasta,

            estado:
              item.estado,

            cantidadPersonasTotal:
              item.cantidadPersonasTotal,

            cantidadReservas:
              item.reservas.length,

            creadoEn:
              item.creadoEn,
          }),
        ),
    };
  }
}