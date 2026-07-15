import { Injectable } from '@nestjs/common';

import { ListCalculationsUseCase } from './list-calculations.use-case';

import { ListCalculationsRequestDto } from './dto/list-calculations.request.dto';
import { ListCalculationsResponseDto } from './dto/list-calculations.response.dto';

@Injectable()
export class ListCalculationsService {
  constructor(
    private readonly useCase: ListCalculationsUseCase,
  ) {}

  execute(
    request: ListCalculationsRequestDto,
  ): Promise<ListCalculationsResponseDto> {
    return this.useCase.execute(
      request,
    );
  }
}