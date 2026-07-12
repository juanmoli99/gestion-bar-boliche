import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ReactivateSupplierRepository } from './reactivate-supplier.repository';

@Injectable()
export class ReactivateSupplierUseCase {
  constructor(
    private readonly repository: ReactivateSupplierRepository,
  ) {}

  async execute(id: string) {
    const supplier = await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    }

    return this.repository.reactivate(id);
  }
}