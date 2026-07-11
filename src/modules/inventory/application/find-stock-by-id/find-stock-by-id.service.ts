import { Injectable } from '@nestjs/common';

import { FindStockByIdUseCase } from './find-stock-by-id.use-case';
import { FindStockByIdResponseDto } from './dto/find-stock-by-id.response.dto';

@Injectable()
export class FindStockByIdService {
  constructor(
    private readonly findStockByIdUseCase: FindStockByIdUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<FindStockByIdResponseDto> {
    return this.findStockByIdUseCase.execute(id);
  }
}