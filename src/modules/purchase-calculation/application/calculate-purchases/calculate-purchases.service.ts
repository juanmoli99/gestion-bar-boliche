import { Injectable } from '@nestjs/common';

import { CalculatePurchasesUseCase } from './calculate-purchases.use-case';
import { CalculatePurchasesRequestDto } from './dto/calculate-purchases.request.dto';

@Injectable()
export class CalculatePurchasesService {
  constructor(
    private readonly useCase: CalculatePurchasesUseCase,
  ) {}

  execute(
    request: CalculatePurchasesRequestDto,
  ) {
    return this.useCase.execute(request);
  }
}