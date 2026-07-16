import { Module } from '@nestjs/common';

import { InventoryModule } from '../inventory/inventory.module';

import { DashboardController } from './presentation/dashboard.controller';

import { DashboardService } from './application/get-dashboard/dashboard.service';
import { DashboardUseCase } from './application/get-dashboard/dashboard.use-case';
import { DashboardRepository } from './application/get-dashboard/dashboard.repository';

@Module({
  imports: [
    InventoryModule,
  ],
  controllers: [
    DashboardController,
  ],
  providers: [
    DashboardService,
    DashboardUseCase,
    DashboardRepository,
  ],
})
export class DashboardModule {}