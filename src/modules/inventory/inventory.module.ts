import { Module } from '@nestjs/common';

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
  ],
  providers: [
    CreateItemRepository,
    CreateItemService,
    CreateItemUseCase,

    ListItemsRepository,
    ListItemsService,
    ListItemsUseCase,
  ],
})
export class InventoryModule {}