import { Injectable } from '@nestjs/common';

import { CreatePurchaseUseCase } from './create-purchase.use-case';
import { CreatePurchaseRequestDto } from './dto/create-purchase.request.dto';
import { CreatePurchaseResponseDto } from './dto/create-purchase.response.dto';

@Injectable()
export class CreatePurchaseService {
  constructor(
    private readonly createPurchaseUseCase: CreatePurchaseUseCase,
  ) {}

  async execute(
    request: CreatePurchaseRequestDto,
  ): Promise<CreatePurchaseResponseDto> {
    return this.createPurchaseUseCase.execute(
      request,
    );
  }
}