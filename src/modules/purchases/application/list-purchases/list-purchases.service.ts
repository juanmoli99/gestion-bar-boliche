import { Injectable } from '@nestjs/common';

import { ListPurchasesUseCase } from './list-purchases.use-case';
import { ListPurchasesResponseDto } from './dto/list-purchases.response.dto';

@Injectable()
export class ListPurchasesService {
  constructor(
    private readonly listPurchasesUseCase: ListPurchasesUseCase,
  ) {}

  async execute(): Promise<ListPurchasesResponseDto[]> {
    return this.listPurchasesUseCase.execute();
  }
}