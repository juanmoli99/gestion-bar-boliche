import { Injectable } from '@nestjs/common';

import { ReactivateSupplierUseCase } from './reactivate-supplier.use-case';

@Injectable()
export class ReactivateSupplierService {
  constructor(
    private readonly reactivateSupplierUseCase: ReactivateSupplierUseCase,
  ) {}

  async execute(id: string) {
    return this.reactivateSupplierUseCase.execute(id);
  }
}