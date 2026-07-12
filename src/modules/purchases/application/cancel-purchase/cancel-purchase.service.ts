import { Injectable } from '@nestjs/common';

import { CancelPurchaseUseCase } from './cancel-purchase.use-case';
import { CancelPurchaseResponseDto } from './dto/cancel-purchase.response.dto';

@Injectable()
export class CancelPurchaseService {
  constructor(
    private readonly cancelPurchaseUseCase: CancelPurchaseUseCase,
  ) {}

  async execute(
    compraId: string,
    usuarioId: string,
  ): Promise<CancelPurchaseResponseDto> {
    return this.cancelPurchaseUseCase.execute(
      compraId,
      usuarioId,
    );
  }
}