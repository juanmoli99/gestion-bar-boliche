import { Injectable } from '@nestjs/common';

import { DeactivateItemUseCase } from './deactivate-item.use-case';
import { DeactivateItemResponseDto } from './dto/deactivate-item.response.dto';

@Injectable()
export class DeactivateItemService {
  constructor(
    private readonly deactivateItemUseCase: DeactivateItemUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<DeactivateItemResponseDto> {
    return this.deactivateItemUseCase.execute(id);
  }
}