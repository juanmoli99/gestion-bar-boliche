import { Injectable } from '@nestjs/common';

import { DeactivateSupplierUseCase } from './deactivate-supplier.use-case';

@Injectable()
export class DeactivateSupplierService {
  constructor(
    private readonly deactivateSupplierUseCase: DeactivateSupplierUseCase,
  ) {}

  async execute(id: string) {
    return this.deactivateSupplierUseCase.execute(id);
  }
}