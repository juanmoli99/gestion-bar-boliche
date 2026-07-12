import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoCompra } from '../../../../generated/prisma/enums';

import { DeletePurchaseItemRepository } from './delete-purchase-item.repository';

@Injectable()
export class DeletePurchaseItemUseCase {
  constructor(
    private readonly repository: DeletePurchaseItemRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const detail =
      await this.repository.findDetail(id);

    if (!detail) {
      throw new NotFoundException(
        'El detalle de compra no existe.',
      );
    }

    if (
      detail.compra.estado !==
      EstadoCompra.BORRADOR
    ) {
      throw new BadRequestException(
        'Solo se pueden modificar compras en estado BORRADOR.',
      );
    }

    await this.repository.delete(id);
  }
}