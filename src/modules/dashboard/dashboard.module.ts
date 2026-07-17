import { Module } from '@nestjs/common';

import { InventoryModule } from '../inventory/inventory.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { ReservationsModule } from '../reservations/reservations.module';

import { DashboardRepository } from './application/get-dashboard/dashboard.repository';
import { DashboardService } from './application/get-dashboard/dashboard.service';
import { DashboardUseCase } from './application/get-dashboard/dashboard.use-case';

import { DashboardController } from './presentation/dashboard.controller';

import {
  DashboardRealtimeModule,
} from './realtime/dashboard-realtime.module';

@Module({
  imports: [
    InventoryModule,
    ReservationsModule,
    PurchasesModule,
    DashboardRealtimeModule,
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