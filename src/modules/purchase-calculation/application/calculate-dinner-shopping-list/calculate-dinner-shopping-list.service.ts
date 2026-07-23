import { Injectable } from '@nestjs/common';

import { CalculateDinnerShoppingListUseCase } from './calculate-dinner-shopping-list.use-case';

import { CalculateDinnerShoppingListRequestDto } from './dto/calculate-dinner-shopping-list.request.dto';

import { CalculateDinnerShoppingListResponseDto } from './dto/calculate-dinner-shopping-list.response.dto';

@Injectable()
export class CalculateDinnerShoppingListService {
  constructor(
    private readonly useCase: CalculateDinnerShoppingListUseCase,
  ) {}

  async execute(
    request: CalculateDinnerShoppingListRequestDto,
  ): Promise<CalculateDinnerShoppingListResponseDto> {
    return this.useCase.execute(request);
  }
}