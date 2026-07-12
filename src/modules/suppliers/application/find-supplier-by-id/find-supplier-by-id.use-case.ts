import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FindSupplierByIdRepository } from './find-supplier-by-id.repository';
import { FindSupplierByIdResponseDto } from './dto/find-supplier-by-id.response.dto';

@Injectable()
export class FindSupplierByIdUseCase {
  constructor(
    private readonly repository: FindSupplierByIdRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<FindSupplierByIdResponseDto> {
    const supplier = await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    }

    return supplier;
  }
}