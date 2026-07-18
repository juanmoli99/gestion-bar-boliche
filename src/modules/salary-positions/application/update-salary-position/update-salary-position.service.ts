import { Injectable } from '@nestjs/common';

import { UpdateSalaryPositionUseCase } from './update-salary-position.use-case';
import { UpdateSalaryPositionRequestDto } from './dto/update-salary-position.request.dto';
import { UpdateSalaryPositionResponseDto } from './dto/update-salary-position.response.dto';

@Injectable()
export class UpdateSalaryPositionService {
  constructor(
    private readonly updateSalaryPositionUseCase: UpdateSalaryPositionUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateSalaryPositionRequestDto,
  ): Promise<UpdateSalaryPositionResponseDto> {
    return this.updateSalaryPositionUseCase.execute(
      id,
      request,
    );
  }
}