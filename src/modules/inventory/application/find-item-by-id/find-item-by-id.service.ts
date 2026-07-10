import { Injectable } from '@nestjs/common';

import { FindItemByIdUseCase } from './find-item-by-id.use-case';
import { FindItemByIdResponseDto } from './dto/find-item-by-id.response.dto';

@Injectable()
export class FindItemByIdService {
  constructor(
    private readonly findItemByIdUseCase: FindItemByIdUseCase,
  ) {}

  async execute(id: string): Promise<FindItemByIdResponseDto> {
    return this.findItemByIdUseCase.execute(id);
  }
}