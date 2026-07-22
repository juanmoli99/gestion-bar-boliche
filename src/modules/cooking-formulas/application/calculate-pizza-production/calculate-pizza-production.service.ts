import { Injectable } from '@nestjs/common';

import { CalculatePizzaProductionUseCase } from './calculate-pizza-production.use-case';
import { CalculatePizzaProductionRequestDto } from './dto/calculate-pizza-production.request.dto';

@Injectable()
export class CalculatePizzaProductionService {
  constructor(
    private readonly useCase:
      CalculatePizzaProductionUseCase,
  ) {}

  execute(
    request: CalculatePizzaProductionRequestDto,
  ) {
    return this.useCase.execute(
      request,
    );
  }
}