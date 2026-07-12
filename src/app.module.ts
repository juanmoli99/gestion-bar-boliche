import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ConfigModule } from './core/config/config.module';
import { PrismaModule } from './core/database/prisma.module';
import { HealthModule } from './core/health/health.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { RolesGuard } from './shared/guards/roles.guard';

@Module({
  imports: [
  ConfigModule,
  PrismaModule,
  HealthModule,
  UsersModule,
  AuthModule,
  InventoryModule,
  SuppliersModule,
  PurchasesModule,
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