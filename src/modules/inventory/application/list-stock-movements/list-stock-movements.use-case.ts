import { Injectable } from '@nestjs/common';

import { ListStockMovementsRepository } from './list-stock-movements.repository';
import { ListStockMovementsResponseDto } from './dto/list-stock-movements.response.dto';

@Injectable()
export class ListStockMovementsUseCase {
  constructor(
    private readonly repository: ListStockMovementsRepository,
  ) {}

  async execute(): Promise<ListStockMovementsResponseDto[]> {
    return this.repository.findAll();
  }
}