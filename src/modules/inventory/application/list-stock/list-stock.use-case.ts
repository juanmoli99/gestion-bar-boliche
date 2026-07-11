import { Injectable } from '@nestjs/common';

import { ListStockRepository } from './list-stock.repository';
import { ListStockResponseDto } from './dto/list-stock.response.dto';

@Injectable()
export class ListStockUseCase {
  constructor(
    private readonly repository: ListStockRepository,
  ) {}

  async execute(): Promise<ListStockResponseDto[]> {
    return this.repository.findAll();
  }
}