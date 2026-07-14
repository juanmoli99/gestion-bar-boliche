import { Module } from '@nestjs/common';
import { PurchaseCalculationEngine } from './domain/purchase-calculation.engine';
import { PrismaModule } from '../../core/database/prisma.module';
import { CalculateShoppingListController } from './application/calculate-shopping-list/calculate-shopping-list.controller';
import { CalculateShoppingListRepository } from './application/calculate-shopping-list/calculate-shopping-list.repository';
import { CalculateShoppingListService } from './application/calculate-shopping-list/calculate-shopping-list.service';
import { CalculateShoppingListUseCase } from './application/calculate-shopping-list/calculate-shopping-list.use-case';
import { CalculatePurchasesController } from './application/calculate-purchases/calculate-purchases.controller';
import { CalculatePurchasesRepository } from './application/calculate-purchases/calculate-purchases.repository';
import { CalculatePurchasesService } from './application/calculate-purchases/calculate-purchases.service';
import { CalculatePurchasesUseCase } from './application/calculate-purchases/calculate-purchases.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    CalculatePurchasesController,
    CalculateShoppingListController,
  ],
  providers: [
    CalculatePurchasesRepository,
    CalculatePurchasesService,
    CalculatePurchasesUseCase,
    PurchaseCalculationEngine,
    
    CalculateShoppingListRepository,
    CalculateShoppingListService,
    CalculateShoppingListUseCase,
  ],
})
export class PurchaseCalculationModule {}