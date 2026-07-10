import { Module } from '@nestjs/common';

import { CreateItemController } from './application/create-item/create-item.controller';
import { CreateItemRepository } from './application/create-item/create-item.repository';
import { CreateItemService } from './application/create-item/create-item.service';
import { CreateItemUseCase } from './application/create-item/create-item.use-case';

@Module({
  controllers: [CreateItemController],
  providers: [
    CreateItemRepository,
    CreateItemService,
    CreateItemUseCase,
  ],
})
export class InventoryModule {}