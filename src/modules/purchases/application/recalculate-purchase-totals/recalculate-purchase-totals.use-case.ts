import { Injectable } from '@nestjs/common';

import { RecalculatePurchaseTotalsRepository } from './recalculate-purchase-totals.repository';

@Injectable()
export class RecalculatePurchaseTotalsUseCase {
  constructor(
    private readonly repository: RecalculatePurchaseTotalsRepository,
  ) {}

  async execute(
    compraId: string,
  ): Promise<void> {
    const items =
      await this.repository.findItems(compraId);

    let subtotal = 0;
    let descuentoTotal = 0;
    let ivaTotal = 0;

    for (const item of items) {
      const base =
        Number(item.cantidad) *
        Number(item.precioUnitario);

      const descuento =
        base *
        (Number(item.porcentajeDescuento) / 100);

      const neto = base - descuento;

      const iva =
        neto *
        (Number(item.porcentajeIva) / 100);

      subtotal += base;
      descuentoTotal += descuento;
      ivaTotal += iva;
    }

    const total =
      subtotal -
      descuentoTotal +
      ivaTotal;

    await this.repository.updateTotals(
      compraId,
      subtotal,
      descuentoTotal,
      ivaTotal,
      total,
    );
  }
}