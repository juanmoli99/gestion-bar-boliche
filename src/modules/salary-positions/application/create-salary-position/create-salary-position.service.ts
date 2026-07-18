import { Injectable } from '@nestjs/common';

import { CreateSalaryPositionUseCase } from './create-salary-position.use-case';
import { CreateSalaryPositionRequestDto } from './dto/create-salary-position.request.dto';
import { CreateSalaryPositionResponseDto } from './dto/create-salary-position.response.dto';

@Injectable()
export class CreateSalaryPositionService {
  constructor(
    private readonly createSalaryPositionUseCase: CreateSalaryPositionUseCase,
  ) {}

  async execute(
    request: CreateSalaryPositionRequestDto,
  ): Promise<CreateSalaryPositionResponseDto> {
    return this.createSalaryPositionUseCase.execute(request);
  }
}