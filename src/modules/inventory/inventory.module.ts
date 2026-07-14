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
import { CreateStockMovementController } from './application/create-stock-movement/create-stock-movement.controller';
import { CreateStockMovementRepository } from './application/create-stock-movement/create-stock-movement.repository';
import { CreateStockMovementService } from './application/create-stock-movement/create-stock-movement.service';
import { CreateStockMovementUseCase } from './application/create-stock-movement/create-stock-movement.use-case';
import { ListStockMovementsController } from './application/list-stock-movements/list-stock-movements.controller';
import { ListStockMovementsRepository } from './application/list-stock-movements/list-stock-movements.repository';
import { ListStockMovementsService } from './application/list-stock-movements/list-stock-movements.service';
import { ListStockMovementsUseCase } from './application/list-stock-movements/list-stock-movements.use-case';
import { FindStockMovementByIdController } from './application/find-stock-movement-by-id/find-stock-movement-by-id.controller';
import { FindStockMovementByIdRepository } from './application/find-stock-movement-by-id/find-stock-movement-by-id.repository';
import { FindStockMovementByIdService } from './application/find-stock-movement-by-id/find-stock-movement-by-id.service';
import { FindStockMovementByIdUseCase } from './application/find-stock-movement-by-id/find-stock-movement-by-id.use-case';
import { CreateCategoryController } from './application/create-category/create-category.controller';
import { CreateCategoryRepository } from './application/create-category/create-category.repository';
import { CreateCategoryService } from './application/create-category/create-category.service';
import { CreateCategoryUseCase } from './application/create-category/create-category.use-case';
import { ListCategoriesController } from './application/list-categories/list-categories.controller';
import { ListCategoriesRepository } from './application/list-categories/list-categories.repository';
import { ListCategoriesService } from './application/list-categories/list-categories.service';
import { ListCategoriesUseCase } from './application/list-categories/list-categories.use-case';
import { ListCategoriesByInventoryController } from './application/list-categories-by-inventory/list-categories-by-inventory.controller';
import { ListCategoriesByInventoryRepository } from './application/list-categories-by-inventory/list-categories-by-inventory.repository';
import { ListCategoriesByInventoryService } from './application/list-categories-by-inventory/list-categories-by-inventory.service';
import { ListCategoriesByInventoryUseCase } from './application/list-categories-by-inventory/list-categories-by-inventory.use-case';
import { CreateUnitController } from './application/create-unit/create-unit.controller';
import { CreateUnitRepository } from './application/create-unit/create-unit.repository';
import { CreateUnitService } from './application/create-unit/create-unit.service';
import { CreateUnitUseCase } from './application/create-unit/create-unit.use-case';
import { ListUnitsController } from './application/list-units/list-units.controller';
import { ListUnitsRepository } from './application/list-units/list-units.repository';
import { ListUnitsService } from './application/list-units/list-units.service';
import { ListUnitsUseCase } from './application/list-units/list-units.use-case';
import { UpdateUnitController } from './application/update-unit/update-unit.controller';
import { UpdateUnitRepository } from './application/update-unit/update-unit.repository';
import { UpdateUnitService } from './application/update-unit/update-unit.service';
import { UpdateUnitUseCase } from './application/update-unit/update-unit.use-case';
import { DeactivateUnitController } from './application/deactivate-unit/deactivate-unit.controller';
import { DeactivateUnitRepository } from './application/deactivate-unit/deactivate-unit.repository';
import { DeactivateUnitService } from './application/deactivate-unit/deactivate-unit.service';
import { DeactivateUnitUseCase } from './application/deactivate-unit/deactivate-unit.use-case';
import { UpdateCategoryController } from './application/update-category/update-category.controller';
import { UpdateCategoryRepository } from './application/update-category/update-category.repository';
import { UpdateCategoryService } from './application/update-category/update-category.service';
import { UpdateCategoryUseCase } from './application/update-category/update-category.use-case';

import { DeactivateCategoryController } from './application/deactivate-category/deactivate-category.controller';
import { DeactivateCategoryRepository } from './application/deactivate-category/deactivate-category.repository';
import { DeactivateCategoryService } from './application/deactivate-category/deactivate-category.service';
import { DeactivateCategoryUseCase } from './application/deactivate-category/deactivate-category.use-case';
import { InventoryCountController } from './application/inventory-count/inventory-count.controller';
import { InventoryCountRepository } from './application/inventory-count/inventory-count.repository';
import { InventoryCountService } from './application/inventory-count/inventory-count.service';
import { InventoryCountUseCase } from './application/inventory-count/inventory-count.use-case';
import { ReactivateCategoryController } from './application/reactivate-category/reactivate-category.controller';
import { ReactivateCategoryRepository } from './application/reactivate-category/reactivate-category.repository';
import { ReactivateCategoryService } from './application/reactivate-category/reactivate-category.service';
import { ReactivateCategoryUseCase } from './application/reactivate-category/reactivate-category.use-case';
import { ReactivateUnitController } from './application/reactivate-unit/reactivate-unit.controller';
import { ReactivateUnitRepository } from './application/reactivate-unit/reactivate-unit.repository';
import { ReactivateUnitService } from './application/reactivate-unit/reactivate-unit.service';
import { ReactivateUnitUseCase } from './application/reactivate-unit/reactivate-unit.use-case';

@Module({
  controllers: [
  CreateItemController,
  CreateStockController,
  CreateStockMovementController,
  ListStockMovementsController,
  UpdateStockController,
  FindStockByIdController,
  ReactivateItemController,
  FindStockMovementByIdController,
  CreateCategoryController,
  ListCategoriesController,
  ListItemsController,
  FindItemByIdController,
  UpdateItemController,
  DeactivateItemController,
  ListStockController,
  ListCategoriesByInventoryController,
  CreateUnitController,
  ListUnitsController,
  UpdateUnitController,
  DeactivateUnitController,
  ReactivateUnitController,
  UpdateCategoryController,
  DeactivateCategoryController,
  ReactivateCategoryController,
  InventoryCountController,
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

  CreateStockMovementRepository,
  CreateStockMovementService,
  CreateStockMovementUseCase,

  ListStockMovementsRepository,
  ListStockMovementsService,
  ListStockMovementsUseCase,

  FindStockMovementByIdRepository,
  FindStockMovementByIdService,
  FindStockMovementByIdUseCase,

  CreateCategoryRepository,
  CreateCategoryService,
  CreateCategoryUseCase,

  ListCategoriesRepository,
  ListCategoriesService,
  ListCategoriesUseCase,

  ListCategoriesByInventoryRepository,
  ListCategoriesByInventoryService,
  ListCategoriesByInventoryUseCase,

  CreateUnitRepository,
  CreateUnitService,
  CreateUnitUseCase,

  ListUnitsRepository,
  ListUnitsService,
  ListUnitsUseCase,

  UpdateUnitRepository,
  UpdateUnitService,
  UpdateUnitUseCase,

  DeactivateUnitRepository,
  DeactivateUnitService,
  DeactivateUnitUseCase,

  ReactivateUnitRepository,
  ReactivateUnitService,
  ReactivateUnitUseCase,

  UpdateCategoryRepository,
  UpdateCategoryService,
  UpdateCategoryUseCase,

  DeactivateCategoryRepository,
  DeactivateCategoryService,
  DeactivateCategoryUseCase,

  ReactivateCategoryRepository,
  ReactivateCategoryService,
  ReactivateCategoryUseCase,

  InventoryCountRepository,
  InventoryCountService,
  InventoryCountUseCase,
],
})
export class InventoryModule {}