import { Injectable } from '@nestjs/common';

import { UpdateStockUseCase } from './update-stock.use-case';
import { UpdateStockRequestDto } from './dto/update-stock.request.dto';
import { UpdateStockResponseDto } from './dto/update-stock.response.dto';

@Injectable()
export class UpdateStockService {
  constructor(
    private readonly updateStockUseCase: UpdateStockUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateStockRequestDto,
  ): Promise<UpdateStockResponseDto> {
    return this.updateStockUseCase.execute(id, request);
  }
}