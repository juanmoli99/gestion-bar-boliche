import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { PurchaseCalculationEngine } from './domain/purchase-calculation.engine';

import { CalculateShoppingListController } from './application/calculate-shopping-list/calculate-shopping-list.controller';
import { CalculateShoppingListRepository } from './application/calculate-shopping-list/calculate-shopping-list.repository';
import { CalculateShoppingListService } from './application/calculate-shopping-list/calculate-shopping-list.service';
import { CalculateShoppingListUseCase } from './application/calculate-shopping-list/calculate-shopping-list.use-case';

import { CalculatePurchasesController } from './application/calculate-purchases/calculate-purchases.controller';
import { CalculatePurchasesRepository } from './application/calculate-purchases/calculate-purchases.repository';
import { CalculatePurchasesService } from './application/calculate-purchases/calculate-purchases.service';
import { CalculatePurchasesUseCase } from './application/calculate-purchases/calculate-purchases.use-case';

import { CalculateDinnerShoppingListController } from './application/calculate-dinner-shopping-list/calculate-dinner-shopping-list.controller';
import { CalculateDinnerShoppingListRepository } from './application/calculate-dinner-shopping-list/calculate-dinner-shopping-list.repository';
import { CalculateDinnerShoppingListService } from './application/calculate-dinner-shopping-list/calculate-dinner-shopping-list.service';
import { CalculateDinnerShoppingListUseCase } from './application/calculate-dinner-shopping-list/calculate-dinner-shopping-list.use-case';

import { SaveCalculationRepository } from './application/save-calculation/save-calculation.repository';
import { SaveCalculationService } from './application/save-calculation/save-calculation.service';

import { ListCalculationsController } from './application/list-calculations/list-calculations.controller';
import { ListCalculationsRepository } from './application/list-calculations/list-calculations.repository';
import { ListCalculationsService } from './application/list-calculations/list-calculations.service';
import { ListCalculationsUseCase } from './application/list-calculations/list-calculations.use-case';

import { GetCalculationController } from './application/get-calculation/get-calculation.controller';
import { GetCalculationRepository } from './application/get-calculation/get-calculation.repository';
import { GetCalculationService } from './application/get-calculation/get-calculation.service';
import { GetCalculationUseCase } from './application/get-calculation/get-calculation.use-case';

import { DeleteCalculationController } from './application/delete-calculation/delete-calculation.controller';
import { DeleteCalculationRepository } from './application/delete-calculation/delete-calculation.repository';
import { DeleteCalculationService } from './application/delete-calculation/delete-calculation.service';
import { DeleteCalculationUseCase } from './application/delete-calculation/delete-calculation.use-case';

import { RestoreCalculationController } from './application/restore-calculation/restore-calculation.controller';
import { RestoreCalculationRepository } from './application/restore-calculation/restore-calculation.repository';
import { RestoreCalculationService } from './application/restore-calculation/restore-calculation.service';
import { RestoreCalculationUseCase } from './application/restore-calculation/restore-calculation.use-case';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    CalculatePurchasesController,
    CalculateShoppingListController,
    CalculateDinnerShoppingListController,
    ListCalculationsController,
    GetCalculationController,
    DeleteCalculationController,
    RestoreCalculationController,
  ],

  providers: [
    CalculatePurchasesRepository,
    CalculatePurchasesService,
    CalculatePurchasesUseCase,

    PurchaseCalculationEngine,

    CalculateShoppingListRepository,
    CalculateShoppingListService,
    CalculateShoppingListUseCase,

    CalculateDinnerShoppingListRepository,
    CalculateDinnerShoppingListService,
    CalculateDinnerShoppingListUseCase,

    SaveCalculationRepository,
    SaveCalculationService,

    ListCalculationsRepository,
    ListCalculationsService,
    ListCalculationsUseCase,

    GetCalculationRepository,
    GetCalculationService,
    GetCalculationUseCase,

    DeleteCalculationRepository,
    DeleteCalculationService,
    DeleteCalculationUseCase,

    RestoreCalculationRepository,
    RestoreCalculationService,
    RestoreCalculationUseCase,
  ],
})
export class PurchaseCalculationModule {}