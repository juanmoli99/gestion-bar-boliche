import { Injectable } from '@nestjs/common';

import { ReactivateItemUseCase } from './reactivate-item.use-case';
import { ReactivateItemResponseDto } from './dto/reactivate-item.response.dto';

@Injectable()
export class ReactivateItemService {
  constructor(
    private readonly reactivateItemUseCase: ReactivateItemUseCase,
  ) {}

  async execute(
    id: string,
  ): Promise<ReactivateItemResponseDto> {
    return this.reactivateItemUseCase.execute(id);
  }
}