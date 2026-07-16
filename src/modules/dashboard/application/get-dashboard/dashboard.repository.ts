import { Injectable } from '@nestjs/common';

import { GetCriticalInventoryUseCase } from '../../../inventory/application/get-critical-inventory/get-critical-inventory.use-case';

import { DashboardResponseDto } from './dto/dashboard.response.dto';

@Injectable()
export class DashboardRepository {
  constructor(
    private readonly getCriticalInventoryUseCase:
      GetCriticalInventoryUseCase,
  ) {}

  async getDashboard(): Promise<DashboardResponseDto> {
    const criticalInventory =
      await this.getCriticalInventoryUseCase.execute();

    return {
      inventoryAlerts:
        criticalInventory.groups,

      todayReservations: [],
      todayEvents: [],
      pendingPurchases: [],
    };
  }
}