import { Injectable } from '@nestjs/common';

import { PurchaseCalculationEngine } from '../../domain/purchase-calculation.engine';

import { CalculatePurchasesRequestDto } from './dto/calculate-purchases.request.dto';
import { CalculatePurchasesResponseDto } from './dto/calculate-purchases.response.dto';

@Injectable()
export class CalculatePurchasesUseCase {
  constructor(
    private readonly engine: PurchaseCalculationEngine,
  ) {}

  async execute(
    request: CalculatePurchasesRequestDto,
  ): Promise<CalculatePurchasesResponseDto> {

    const result =
      await this.engine.execute(
        new Date(
          `${request.fechaDesde}T00:00:00.000`,
        ),
        new Date(
          `${request.fechaHasta}T23:59:59.999`,
        ),
      );

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