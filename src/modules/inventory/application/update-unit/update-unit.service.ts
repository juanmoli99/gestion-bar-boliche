import { Injectable } from '@nestjs/common';

import { UpdateUnitUseCase } from './update-unit.use-case';
import { UpdateUnitRequestDto } from './dto/update-unit.request.dto';
import { UpdateUnitResponseDto } from './dto/update-unit.response.dto';

@Injectable()
export class UpdateUnitService {
  constructor(
    private readonly updateUnitUseCase: UpdateUnitUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateUnitRequestDto,
  ): Promise<UpdateUnitResponseDto> {
    return this.updateUnitUseCase.execute(id, request);
  }
}