import { Injectable } from '@nestjs/common';

import { ListFreeBarRatesRepository } from './list-free-bar-rates.repository';

@Injectable()
export class ListFreeBarRatesUseCase {
  constructor(
    private readonly listFreeBarRatesRepository: ListFreeBarRatesRepository,
  ) {}

  async execute() {
    return this.listFreeBarRatesRepository.execute();
  }
}