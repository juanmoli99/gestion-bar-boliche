import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { CreateSupplierController } from './application/create-supplier/create-supplier.controller';
import { CreateSupplierRepository } from './application/create-supplier/create-supplier.repository';
import { CreateSupplierService } from './application/create-supplier/create-supplier.service';
import { CreateSupplierUseCase } from './application/create-supplier/create-supplier.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateSupplierController,
  ],
  providers: [
    CreateSupplierRepository,
    CreateSupplierService,
    CreateSupplierUseCase,
  ],
})
export class SuppliersModule {}