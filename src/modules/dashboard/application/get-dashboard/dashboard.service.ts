import { Injectable } from '@nestjs/common';

import { DashboardUseCase } from './dashboard.use-case';
import { DashboardResponseDto } from './dto/dashboard.response.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly useCase: DashboardUseCase,
  ) {}

  async execute(): Promise<DashboardResponseDto> {
    return this.useCase.execute();
  }
}