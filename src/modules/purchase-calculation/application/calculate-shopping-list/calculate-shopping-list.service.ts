import { Injectable } from '@nestjs/common';

import { CalculateShoppingListUseCase } from './calculate-shopping-list.use-case';
import { CalculateShoppingListRequestDto } from './dto/calculate-shopping-list.request.dto';
import { CalculateShoppingListResponseDto } from './dto/calculate-shopping-list.response.dto';

@Injectable()
export class CalculateShoppingListService {
  constructor(
    private readonly useCase: CalculateShoppingListUseCase,
  ) {}

  async execute(
    request: CalculateShoppingListRequestDto,
  ): Promise<CalculateShoppingListResponseDto> {
    return this.useCase.execute(request);
  }
}