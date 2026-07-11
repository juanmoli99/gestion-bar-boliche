import { Injectable } from '@nestjs/common';

import { CreateStockMovementUseCase } from './create-stock-movement.use-case';
import { CreateStockMovementRequestDto } from './dto/create-stock-movement.request.dto';
import { CreateStockMovementResponseDto } from './dto/create-stock-movement.response.dto';

@Injectable()
export class CreateStockMovementService {
  constructor(
    private readonly createStockMovementUseCase: CreateStockMovementUseCase,
  ) {}

  async execute(
    request: CreateStockMovementRequestDto,
    usuarioId?: string,
  ): Promise<CreateStockMovementResponseDto> {
    return this.createStockMovementUseCase.execute(
      request,
      usuarioId,
    );
  }
}