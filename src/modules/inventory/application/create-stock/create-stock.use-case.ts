import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateStockRepository } from './create-stock.repository';
import { CreateStockRequestDto } from './dto/create-stock.request.dto';
import { CreateStockResponseDto } from './dto/create-stock.response.dto';

@Injectable()
export class CreateStockUseCase {
  constructor(
    private readonly repository: CreateStockRepository,
  ) {}

  async execute(
    request: CreateStockRequestDto,
  ): Promise<CreateStockResponseDto> {
    const itemExiste = await this.repository.itemExiste(
      request.itemId,
    );

    if (!itemExiste) {
      throw new NotFoundException(
        'El ítem no existe.',
      );
    }

    const stockExiste = await this.repository.stockExiste(
      request.itemId,
      request.inventario,
    );

    if (stockExiste) {
      throw new ConflictException(
        'Ya existe un stock para ese inventario.',
      );
    }

    return this.repository.create({
      itemId: request.itemId,
      inventario: request.inventario,
      cantidadActual: request.cantidadActual,
      cantidadMinima: request.cantidadMinima,
    });
  }
}