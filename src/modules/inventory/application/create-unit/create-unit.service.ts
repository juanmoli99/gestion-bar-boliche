import { Injectable } from '@nestjs/common';

import { CreateUnitUseCase } from './create-unit.use-case';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';
import { CreateUnitResponseDto } from './dto/create-unit.response.dto';

@Injectable()
export class CreateUnitService {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
  ) {}

  async execute(
    request: CreateUnitRequestDto,
  ): Promise<CreateUnitResponseDto> {
    return this.createUnitUseCase.execute(request);
  }
}