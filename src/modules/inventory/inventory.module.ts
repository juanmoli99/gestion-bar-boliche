import { Module } from '@nestjs/common';
import { FindItemByIdController } from './application/find-item-by-id/find-item-by-id.controller';
import { FindItemByIdRepository } from './application/find-item-by-id/find-item-by-id.repository';
import { FindItemByIdService } from './application/find-item-by-id/find-item-by-id.service';
import { FindItemByIdUseCase } from './application/find-item-by-id/find-item-by-id.use-case';
import { CreateItemController } from './application/create-item/create-item.controller';
import { CreateItemRepository } from './application/create-item/create-item.repository';
import { CreateItemService } from './application/create-item/create-item.service';
import { CreateItemUseCase } from './application/create-item/create-item.use-case';
import { UpdateItemController } from './application/update-item/update-item.controller';
import { UpdateItemRepository } from './application/update-item/update-item.repository';
import { UpdateItemService } from './application/update-item/update-item.service';
import { UpdateItemUseCase } from './application/update-item/update-item.use-case';
import { ListItemsController } from './application/list-items/list-items.controller';
import { ListItemsRepository } from './application/list-items/list-items.repository';
import { ListItemsService } from './application/list-items/list-items.service';
import { ListItemsUseCase } from './application/list-items/list-items.use-case';
import { DeactivateItemController } from './application/deactivate-item/deactivate-item.controller';
import { DeactivateItemRepository } from './application/deactivate-item/deactivate-item.repository';
import { DeactivateItemService } from './application/deactivate-item/deactivate-item.service';
import { DeactivateItemUseCase } from './application/deactivate-item/deactivate-item.use-case';
import { ReactivateItemController } from './application/reactivate-item/reactivate-item.controller';
import { ReactivateItemRepository } from './application/reactivate-item/reactivate-item.repository';
import { ReactivateItemService } from './application/reactivate-item/reactivate-item.service';
import { ReactivateItemUseCase } from './application/reactivate-item/reactivate-item.use-case';
import { CreateStockController } from './application/create-stock/create-stock.controller';
import { CreateStockRepository } from './application/create-stock/create-stock.repository';
import { CreateStockService } from './application/create-stock/create-stock.service';
import { CreateStockUseCase } from './application/create-stock/create-stock.use-case';
import { ListStockController } from './application/list-stock/list-stock.controller';
import { ListStockRepository } from './application/list-stock/list-stock.repository';
import { ListStockService } from './application/list-stock/list-stock.service';
import { ListStockUseCase } from './application/list-stock/list-stock.use-case';
import { FindStockByIdController } from './application/find-stock-by-id/find-stock-by-id.controller';
import { FindStockByIdRepository } from './application/find-stock-by-id/find-stock-by-id.repository';
import { FindStockByIdService } from './application/find-stock-by-id/find-stock-by-id.service';
import { FindStockByIdUseCase } from './application/find-stock-by-id/find-stock-by-id.use-case';
import { UpdateStockController } from './application/update-stock/update-stock.controller';
import { UpdateStockRepository } from './application/update-stock/update-stock.repository';
import { UpdateStockService } from './application/update-stock/update-stock.service';
import { UpdateStockUseCase } from './application/update-stock/update-stock.use-case';

@Module({
  controllers: [
  CreateItemController,
  CreateStockController,
  UpdateStockController,
  FindStockByIdController,
  ReactivateItemController,

  ListItemsController,
  FindItemByIdController,
  UpdateItemController,
  DeactivateItemController,
  ListStockController,
],
  providers: [
  CreateItemRepository,
  CreateItemService,
  CreateItemUseCase,

  ListItemsRepository,
  ListItemsService,
  ListItemsUseCase,

  FindItemByIdRepository,
  FindItemByIdService,
  FindItemByIdUseCase,

  UpdateItemRepository,
  UpdateItemService,
  UpdateItemUseCase,

  DeactivateItemRepository,
  DeactivateItemService,
  DeactivateItemUseCase,

  ReactivateItemRepository,
  ReactivateItemService,
  ReactivateItemUseCase,

  CreateStockRepository,
  CreateStockService,
  CreateStockUseCase,

  ListStockRepository,
  ListStockService,
  ListStockUseCase,

  FindStockByIdRepository,
  FindStockByIdService,
  FindStockByIdUseCase,

  UpdateStockRepository,
  UpdateStockService,
  UpdateStockUseCase,
],
})
export class InventoryModule {}