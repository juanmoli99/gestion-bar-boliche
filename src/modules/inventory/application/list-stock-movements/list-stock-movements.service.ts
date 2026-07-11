import { Injectable } from '@nestjs/common';

import { ListStockMovementsUseCase } from './list-stock-movements.use-case';
import { ListStockMovementsResponseDto } from './dto/list-stock-movements.response.dto';

@Injectable()
export class ListStockMovementsService {
  constructor(
    private readonly listStockMovementsUseCase: ListStockMovementsUseCase,
  ) {}

  async execute(): Promise<ListStockMovementsResponseDto[]> {
    return this.listStockMovementsUseCase.execute();
  }
}