import { Injectable } from '@nestjs/common';

import { ListFreeBarRatesUseCase } from './list-free-bar-rates.use-case';

@Injectable()
export class ListFreeBarRatesService {
  constructor(
    private readonly listFreeBarRatesUseCase: ListFreeBarRatesUseCase,
  ) {}

  async execute() {
    return this.listFreeBarRatesUseCase.execute();
  }
}