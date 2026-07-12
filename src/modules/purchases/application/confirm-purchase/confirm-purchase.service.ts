import { Injectable } from '@nestjs/common';

import { ConfirmPurchaseUseCase } from './confirm-purchase.use-case';
import { ConfirmPurchaseResponseDto } from './dto/confirm-purchase.response.dto';

@Injectable()
export class ConfirmPurchaseService {
  constructor(
    private readonly confirmPurchaseUseCase: ConfirmPurchaseUseCase,
  ) {}

  async execute(
    compraId: string,
    usuarioId: string,
  ): Promise<ConfirmPurchaseResponseDto> {
    return this.confirmPurchaseUseCase.execute(
      compraId,
      usuarioId,
    );
  }
}