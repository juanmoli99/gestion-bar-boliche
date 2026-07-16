import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './dashboard.repository';
import { DashboardResponseDto } from './dto/dashboard.response.dto';

@Injectable()
export class DashboardUseCase {
  constructor(
    private readonly repository: DashboardRepository,
  ) {}

  async execute(): Promise<DashboardResponseDto> {
    return this.repository.getDashboard();
  }
}