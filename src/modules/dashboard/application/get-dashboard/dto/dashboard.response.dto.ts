import { CriticalInventoryGroupDto } from '../../../../inventory/application/get-critical-inventory/dto/get-critical-inventory.response.dto';
export class DashboardResponseDto {
  inventoryAlerts!: CriticalInventoryGroupDto[];

  todayReservations!: unknown[];

  todayEvents!: unknown[];

  pendingPurchases!: unknown[];
}