import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateStockRepository } from './update-stock.repository';
import { UpdateStockRequestDto } from './dto/update-stock.request.dto';
import { UpdateStockResponseDto } from './dto/update-stock.response.dto';

@Injectable()
export class UpdateStockUseCase {
  constructor(
    private readonly repository: UpdateStockRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateStockRequestDto,
  ): Promise<UpdateStockResponseDto> {
    const stock = await this.repository.findById(id);

    if (!stock) {
      throw new NotFoundException(
        'El stock no existe.',
      );
    }

    return this.repository.update(id, {
      cantidadActual: request.cantidadActual,
      cantidadMinima: request.cantidadMinima,
    });
  }
}