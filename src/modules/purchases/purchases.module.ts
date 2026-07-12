import { Module } from '@nestjs/common';
import { AddPurchaseItemController } from './application/add-purchase-item/add-purchase-item.controller';
import { AddPurchaseItemRepository } from './application/add-purchase-item/add-purchase-item.repository';
import { AddPurchaseItemService } from './application/add-purchase-item/add-purchase-item.service';
import { AddPurchaseItemUseCase } from './application/add-purchase-item/add-purchase-item.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { ListPurchaseItemsController } from './application/list-purchase-items/list-purchase-items.controller';
import { ListPurchaseItemsRepository } from './application/list-purchase-items/list-purchase-items.repository';
import { ListPurchaseItemsService } from './application/list-purchase-items/list-purchase-items.service';
import { ListPurchaseItemsUseCase } from './application/list-purchase-items/list-purchase-items.use-case';
import { CreatePurchaseController } from './application/create-purchase/create-purchase.controller';
import { CreatePurchaseRepository } from './application/create-purchase/create-purchase.repository';
import { CreatePurchaseService } from './application/create-purchase/create-purchase.service';
import { CreatePurchaseUseCase } from './application/create-purchase/create-purchase.use-case';
import { UpdatePurchaseItemController } from './application/update-purchase-item/update-purchase-item.controller';
import { UpdatePurchaseItemRepository } from './application/update-purchase-item/update-purchase-item.repository';
import { UpdatePurchaseItemService } from './application/update-purchase-item/update-purchase-item.service';
import { UpdatePurchaseItemUseCase } from './application/update-purchase-item/update-purchase-item.use-case';
import { DeletePurchaseItemController } from './application/delete-purchase-item/delete-purchase-item.controller';
import { DeletePurchaseItemRepository } from './application/delete-purchase-item/delete-purchase-item.repository';
import { DeletePurchaseItemService } from './application/delete-purchase-item/delete-purchase-item.service';
import { DeletePurchaseItemUseCase } from './application/delete-purchase-item/delete-purchase-item.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    CreatePurchaseController,
    AddPurchaseItemController,
    ListPurchaseItemsController,
    UpdatePurchaseItemController,
    DeletePurchaseItemController,
  ],
  providers: [
    CreatePurchaseRepository,
    CreatePurchaseService,
    CreatePurchaseUseCase,
    AddPurchaseItemRepository,
    AddPurchaseItemService,
    AddPurchaseItemUseCase,
    ListPurchaseItemsRepository,
    ListPurchaseItemsService,
    ListPurchaseItemsUseCase,
    UpdatePurchaseItemRepository,
    UpdatePurchaseItemService,
    UpdatePurchaseItemUseCase,
    DeletePurchaseItemRepository,
    DeletePurchaseItemService,
    DeletePurchaseItemUseCase,
  ],
})
export class PurchasesModule {}