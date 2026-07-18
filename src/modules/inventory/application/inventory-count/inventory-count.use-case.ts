import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RolUsuario } from '../../../../generated/prisma/enums';

import { getAllowedInventory } from '../../../../shared/constants/inventory-role-policy';

import { InventoryCountRepository } from './inventory-count.repository';
import { InventoryCountRequestDto } from './dto/inventory-count.request.dto';
import { InventoryCountResponseDto } from './dto/inventory-count.response.dto';

@Injectable()
export class InventoryCountUseCase {
  constructor(
    private readonly repository: InventoryCountRepository,
  ) {}

  async execute(
    stockId: string,
    userId: string,
    rol: RolUsuario,
    request: InventoryCountRequestDto,
  ): Promise<InventoryCountResponseDto> {
    const inventarioPermitido =
      getAllowedInventory(rol);

    const stock =
      await this.repository.findById(
        stockId,
      );

    if (!stock) {
      throw new NotFoundException(
        'Stock inexistente.',
      );
    }

    if (
      inventarioPermitido !== null &&
      stock.inventario !==
        inventarioPermitido
    ) {
      throw new ForbiddenException(
        'No tiene permisos para modificar este inventario.',
      );
    }

    const resultado =
      await this.repository.count(
        stockId,
        request.cantidadContada,
        userId,
      );

    if (!resultado) {
      throw new NotFoundException(
        'Stock inexistente.',
      );
    }

    return resultado;
  }
}