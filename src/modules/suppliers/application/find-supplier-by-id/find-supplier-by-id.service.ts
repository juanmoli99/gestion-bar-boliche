import { Injectable } from '@nestjs/common';

import { FindSupplierByIdUseCase } from './find-supplier-by-id.use-case';
import { FindSupplierByIdResponseDto } from './dto/find-supplier-by-id.response.dto';

@Injectable()
export class FindSupplierByIdService {
  constructor(
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<FindSupplierByIdResponseDto> {
    return this.findSupplierByIdUseCase.execute(id);
  }
}