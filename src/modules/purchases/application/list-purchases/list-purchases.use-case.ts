import { Injectable } from '@nestjs/common';

import { ListPurchasesRepository } from './list-purchases.repository';
import { ListPurchasesResponseDto } from './dto/list-purchases.response.dto';

@Injectable()
export class ListPurchasesUseCase {
  constructor(
    private readonly repository: ListPurchasesRepository,
  ) {}

  async execute(): Promise<ListPurchasesResponseDto[]> {
    const purchases =
      await this.repository.findAll();

    return purchases.map((purchase) => ({
      id: purchase.id,
      proveedorId: purchase.proveedorId,
      proveedor: purchase.proveedor.razonSocial,
      inventario: purchase.inventario,
      numeroComprobante:
        purchase.numeroComprobante,
      subtotal: purchase.subtotal,
      descuentoTotal:
        purchase.descuentoTotal,
      ivaTotal: purchase.ivaTotal,
      total: purchase.total,
      estado: purchase.estado,
      creadoEn: purchase.creadoEn,
      actualizadoEn:
        purchase.actualizadoEn,
    }));
  }
}