import { Module } from '@nestjs/common';

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
  ],
  providers: [
    CreatePurchaseRepository,
    CreatePurchaseService,
    CreatePurchaseUseCase,
  ],
})
export class PurchasesModule {}