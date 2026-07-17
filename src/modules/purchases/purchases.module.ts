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
import { RecalculatePurchaseTotalsRepository } from './application/recalculate-purchase-totals/recalculate-purchase-totals.repository';
import { RecalculatePurchaseTotalsService } from './application/recalculate-purchase-totals/recalculate-purchase-totals.service';
import { RecalculatePurchaseTotalsUseCase } from './application/recalculate-purchase-totals/recalculate-purchase-totals.use-case';
import { ConfirmPurchaseController } from './application/confirm-purchase/confirm-purchase.controller';
import { ConfirmPurchaseRepository } from './application/confirm-purchase/confirm-purchase.repository';
import { ConfirmPurchaseService } from './application/confirm-purchase/confirm-purchase.service';
import { ConfirmPurchaseUseCase } from './application/confirm-purchase/confirm-purchase.use-case';
import { ListPurchasesController } from './application/list-purchases/list-purchases.controller';
import { ListPurchasesRepository } from './application/list-purchases/list-purchases.repository';
import { ListPurchasesService } from './application/list-purchases/list-purchases.service';
import { ListPurchasesUseCase } from './application/list-purchases/list-purchases.use-case';
import { FindPurchaseByIdController } from './application/find-purchase-by-id/find-purchase-by-id.controller';
import { FindPurchaseByIdRepository } from './application/find-purchase-by-id/find-purchase-by-id.repository';
import { FindPurchaseByIdService } from './application/find-purchase-by-id/find-purchase-by-id.service';
import { FindPurchaseByIdUseCase } from './application/find-purchase-by-id/find-purchase-by-id.use-case';
import { CancelPurchaseController } from './application/cancel-purchase/cancel-purchase.controller';
import { CancelPurchaseRepository } from './application/cancel-purchase/cancel-purchase.repository';
import { CancelPurchaseService } from './application/cancel-purchase/cancel-purchase.service';
import { CancelPurchaseUseCase } from './application/cancel-purchase/cancel-purchase.use-case';

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
    ConfirmPurchaseController,
    ListPurchasesController,
    FindPurchaseByIdController,
    CancelPurchaseController,
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
    RecalculatePurchaseTotalsRepository,
    RecalculatePurchaseTotalsService,
    RecalculatePurchaseTotalsUseCase,
    ConfirmPurchaseRepository,
    ConfirmPurchaseService,
    ConfirmPurchaseUseCase,
    ListPurchasesRepository,
    ListPurchasesService,
    ListPurchasesUseCase,
    FindPurchaseByIdRepository,
    FindPurchaseByIdService,
    FindPurchaseByIdUseCase,
    CancelPurchaseRepository,
    CancelPurchaseService,
    CancelPurchaseUseCase,
  ],
  exports: [
  ListPurchasesService,
  ],
})
export class PurchasesModule {}