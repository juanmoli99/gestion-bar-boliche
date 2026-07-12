import { Injectable } from '@nestjs/common';

import { ConfirmPurchaseRepository } from './confirm-purchase.repository';
import { ConfirmPurchaseResponseDto } from './dto/confirm-purchase.response.dto';

@Injectable()
export class ConfirmPurchaseUseCase {
  constructor(
    private readonly repository: ConfirmPurchaseRepository,
  ) {}

  async execute(
    compraId: string,
    usuarioId: string,
  ): Promise<ConfirmPurchaseResponseDto> {
    return this.repository.confirm(
      compraId,
      usuarioId,
    );
  }
}