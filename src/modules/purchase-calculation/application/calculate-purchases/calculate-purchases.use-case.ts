import { Injectable } from '@nestjs/common';

import { SaveCalculationService } from '../save-calculation/save-calculation.service';

import { PurchaseCalculationEngine } from '../../domain/purchase-calculation.engine';

import { CalculatePurchasesRequestDto } from './dto/calculate-purchases.request.dto';
import { CalculatePurchasesResponseDto } from './dto/calculate-purchases.response.dto';

function createArgentinaDate(
  date: string,
  endOfDay: boolean,
): Date {
  const time = endOfDay
    ? '23:59:59.999'
    : '00:00:00.000';

  return new Date(
    `${date}T${time}-03:00`,
  );
}

@Injectable()
export class CalculatePurchasesUseCase {
  constructor(
    private readonly engine: PurchaseCalculationEngine,
    private readonly saveCalculationService: SaveCalculationService,
  ) {}

  async execute(
    request: CalculatePurchasesRequestDto,
    usuarioId: string,
  ): Promise<CalculatePurchasesResponseDto> {
    const result =
      await this.engine.execute(
        createArgentinaDate(
          request.fechaDesde,
          false,
        ),
        createArgentinaDate(
          request.fechaHasta,
          true,
        ),
      );

    await this.saveCalculationService.execute({
      calculation: result,
      usuarioId,
    });

    return {
      fechaDesde: request.fechaDesde,
      fechaHasta: request.fechaHasta,
      cantidadPersonasTotal:
        result.cantidadPersonasTotal,
      cantidadFiestas:
        result.cantidadFiestas,
      reservas:
        result.reservas,
      desglosePorFecha:
        result.desglosePorFecha,
      totalesPorItem:
        result.totalesPorItem,
    };
  }
}