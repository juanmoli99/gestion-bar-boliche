import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SalaryPositionsModule } from './modules/salary-positions/salary-positions.module';
import { ConfigModule } from './core/config/config.module';
import { PrismaModule } from './core/database/prisma.module';
import { HealthModule } from './core/health/health.module';
import { ValuesModule } from './modules/values/values.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FormulasModule } from './modules/formulas/formulas.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PurchaseCalculationModule } from './modules/purchase-calculation/purchase-calculation.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { UsersModule } from './modules/users/users.module';
import { FreeBarRatesModule } from './modules/free-bar-rates/free-bar-rates.module';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { RolesGuard } from './shared/guards/roles.guard';
import { CookingFormulasModule } from './modules/cooking-formulas/cooking-formulas.module';

@Module({
  imports: [
    CookingFormulasModule,
    SalaryPositionsModule,
    FreeBarRatesModule,
    ConfigModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
    InventoryModule,
    SuppliersModule,
    PurchasesModule,
    FormulasModule,
    ReservationsModule,
    PurchaseCalculationModule,
    DashboardModule,
    ValuesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}