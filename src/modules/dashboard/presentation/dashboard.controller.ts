import {
  Controller,
  Get,
} from '@nestjs/common';

import { DashboardService } from '../application/get-dashboard/dashboard.service';
import { DashboardResponseDto } from '../application/get-dashboard/dto/dashboard.response.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly service: DashboardService,
  ) {}

  @Get()
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.service.execute();
  }
}