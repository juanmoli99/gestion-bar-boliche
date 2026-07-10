import { Module } from '@nestjs/common';
import { FindItemByIdController } from './application/find-item-by-id/find-item-by-id.controller';
import { FindItemByIdRepository } from './application/find-item-by-id/find-item-by-id.repository';
import { FindItemByIdService } from './application/find-item-by-id/find-item-by-id.service';
import { FindItemByIdUseCase } from './application/find-item-by-id/find-item-by-id.use-case';
import { CreateItemController } from './application/create-item/create-item.controller';
import { CreateItemRepository } from './application/create-item/create-item.repository';
import { CreateItemService } from './application/create-item/create-item.service';
import { CreateItemUseCase } from './application/create-item/create-item.use-case';

import { ListItemsController } from './application/list-items/list-items.controller';
import { ListItemsRepository } from './application/list-items/list-items.repository';
import { ListItemsService } from './application/list-items/list-items.service';
import { ListItemsUseCase } from './application/list-items/list-items.use-case';

@Module({
  controllers: [
  CreateItemController,
  ListItemsController,
  FindItemByIdController,
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
],
})
export class InventoryModule {}