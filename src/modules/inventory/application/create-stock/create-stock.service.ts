import { Injectable } from '@nestjs/common';

import { CreateStockUseCase } from './create-stock.use-case';
import { CreateStockRequestDto } from './dto/create-stock.request.dto';
import { CreateStockResponseDto } from './dto/create-stock.response.dto';

@Injectable()
export class CreateStockService {
  constructor(
    private readonly createStockUseCase: CreateStockUseCase,
  ) {}

  async execute(
    request: CreateStockRequestDto,
  ): Promise<CreateStockResponseDto> {
    return this.createStockUseCase.execute(request);
  }
}