import { Injectable } from '@nestjs/common';

import { UpdateSupplierUseCase } from './update-supplier.use-case';
import { UpdateSupplierRequestDto } from './dto/update-supplier.request.dto';
import { UpdateSupplierResponseDto } from './dto/update-supplier.response.dto';

@Injectable()
export class UpdateSupplierService {
  constructor(
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateSupplierRequestDto,
  ): Promise<UpdateSupplierResponseDto> {
    return this.updateSupplierUseCase.execute(
      id,
      request,
    );
  }
}