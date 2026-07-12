import { Module } from '@nestjs/common';
import { AddPurchaseItemController } from './application/add-purchase-item/add-purchase-item.controller';
import { AddPurchaseItemRepository } from './application/add-purchase-item/add-purchase-item.repository';
import { AddPurchaseItemService } from './application/add-purchase-item/add-purchase-item.service';
import { AddPurchaseItemUseCase } from './application/add-purchase-item/add-purchase-item.use-case';
import { PrismaModule } from '../../core/database/prisma.module';

import { CreatePurchaseController } from './application/create-purchase/create-purchase.controller';
import { CreatePurchaseRepository } from './application/create-purchase/create-purchase.repository';
import { CreatePurchaseService } from './application/create-purchase/create-purchase.service';
import { CreatePurchaseUseCase } from './application/create-purchase/create-purchase.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    CreatePurchaseController,
    AddPurchaseItemController,
  ],
  providers: [
    CreatePurchaseRepository,
    CreatePurchaseService,
    CreatePurchaseUseCase,
    AddPurchaseItemRepository,
    AddPurchaseItemService,
    AddPurchaseItemUseCase,
  ],
})
export class PurchasesModule {}