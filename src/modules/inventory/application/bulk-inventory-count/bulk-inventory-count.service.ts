import {
  Injectable,
} from '@nestjs/common';

import {
  BulkInventoryCountUseCase,
} from './bulk-inventory-count.use-case';

import {
  BulkInventoryCountRequestDto,
} from './dto/bulk-inventory-count.request.dto';

import {
  BulkInventoryCountResponseDto,
} from './dto/bulk-inventory-count.response.dto';

@Injectable()
export class BulkInventoryCountService {
  constructor(
    private readonly useCase:
      BulkInventoryCountUseCase,
  ) {}

  async execute(
    usuarioId: string,
    request: BulkInventoryCountRequestDto,
  ): Promise<BulkInventoryCountResponseDto> {
    return this.useCase.execute(
      usuarioId,
      request,
    );
  }
}