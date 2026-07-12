import { Injectable } from '@nestjs/common';

import { FindPurchaseByIdUseCase } from './find-purchase-by-id.use-case';
import { FindPurchaseByIdResponseDto } from './dto/find-purchase-by-id.response.dto';

@Injectable()
export class FindPurchaseByIdService {
  constructor(
    private readonly findPurchaseByIdUseCase: FindPurchaseByIdUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<FindPurchaseByIdResponseDto> {
    return this.findPurchaseByIdUseCase.execute(
      id,
    );
  }
}