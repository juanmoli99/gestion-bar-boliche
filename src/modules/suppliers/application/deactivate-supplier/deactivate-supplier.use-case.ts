import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DeactivateSupplierRepository } from './deactivate-supplier.repository';

@Injectable()
export class DeactivateSupplierUseCase {
  constructor(
    private readonly repository: DeactivateSupplierRepository,
  ) {}

  async execute(id: string) {
    const supplier = await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    }

    return this.repository.deactivate(id);
  }
}