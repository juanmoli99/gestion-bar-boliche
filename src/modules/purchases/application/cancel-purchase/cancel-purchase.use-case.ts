import { Injectable } from '@nestjs/common';

import { CancelPurchaseRepository } from './cancel-purchase.repository';
import { CancelPurchaseResponseDto } from './dto/cancel-purchase.response.dto';

@Injectable()
export class CancelPurchaseUseCase {
  constructor(
    private readonly repository: CancelPurchaseRepository,
  ) {}

  async execute(
    compraId: string,
    usuarioId: string,
  ): Promise<CancelPurchaseResponseDto> {
    return this.repository.cancel(
      compraId,
      usuarioId,
    );
  }
}