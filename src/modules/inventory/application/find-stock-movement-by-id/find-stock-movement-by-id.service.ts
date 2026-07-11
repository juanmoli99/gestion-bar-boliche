import { Injectable } from '@nestjs/common';

import { FindStockMovementByIdUseCase } from './find-stock-movement-by-id.use-case';
import { FindStockMovementByIdResponseDto } from './dto/find-stock-movement-by-id.response.dto';

@Injectable()
export class FindStockMovementByIdService {
  constructor(
    private readonly findStockMovementByIdUseCase: FindStockMovementByIdUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<FindStockMovementByIdResponseDto> {
    return this.findStockMovementByIdUseCase.execute(id);
  }
}