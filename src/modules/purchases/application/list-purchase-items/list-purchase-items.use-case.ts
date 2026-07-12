import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ListPurchaseItemsRepository } from './list-purchase-items.repository';
import { ListPurchaseItemsResponseDto } from './dto/list-purchase-items.response.dto';

@Injectable()
export class ListPurchaseItemsUseCase {
  constructor(
    private readonly repository: ListPurchaseItemsRepository,
  ) {}

  async execute(
    compraId: string,
  ): Promise<ListPurchaseItemsResponseDto[]> {
    const exists =
      await this.repository.purchaseExists(compraId);

    if (!exists) {
      throw new NotFoundException(
        'La compra no existe.',
      );
    }

    const items = await this.repository.findAll(
      compraId,
    );

    return items.map((item) => ({
      id: item.id,
      itemId: item.itemId,
      nombreItem: item.item.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      porcentajeDescuento: item.porcentajeDescuento,
      porcentajeIva: item.porcentajeIva,
      creadoEn: item.creadoEn,
      actualizadoEn: item.actualizadoEn,
    }));
  }
}