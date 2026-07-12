import { Injectable } from '@nestjs/common';

import { CreateSupplierUseCase } from './create-supplier.use-case';
import { CreateSupplierRequestDto } from './dto/create-supplier.request.dto';
import { CreateSupplierResponseDto } from './dto/create-supplier.response.dto';

@Injectable()
export class CreateSupplierService {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
  ) {}

  async execute(
    request: CreateSupplierRequestDto,
  ): Promise<CreateSupplierResponseDto> {
    return this.createSupplierUseCase.execute(request);
  }
}