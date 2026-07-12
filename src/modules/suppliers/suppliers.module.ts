import { Module } from '@nestjs/common';
import { ListSuppliersController } from './application/list-suppliers/list-suppliers.controller';
import { ListSuppliersRepository } from './application/list-suppliers/list-suppliers.repository';
import { ListSuppliersService } from './application/list-suppliers/list-suppliers.service';
import { ListSuppliersUseCase } from './application/list-suppliers/list-suppliers.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { FindSupplierByIdController } from './application/find-supplier-by-id/find-supplier-by-id.controller';
import { FindSupplierByIdRepository } from './application/find-supplier-by-id/find-supplier-by-id.repository';
import { FindSupplierByIdService } from './application/find-supplier-by-id/find-supplier-by-id.service';
import { FindSupplierByIdUseCase } from './application/find-supplier-by-id/find-supplier-by-id.use-case';
import { CreateSupplierController } from './application/create-supplier/create-supplier.controller';
import { CreateSupplierRepository } from './application/create-supplier/create-supplier.repository';
import { CreateSupplierService } from './application/create-supplier/create-supplier.service';
import { CreateSupplierUseCase } from './application/create-supplier/create-supplier.use-case';
import { UpdateSupplierController } from './application/update-supplier/update-supplier.controller';
import { UpdateSupplierRepository } from './application/update-supplier/update-supplier.repository';
import { UpdateSupplierService } from './application/update-supplier/update-supplier.service';
import { UpdateSupplierUseCase } from './application/update-supplier/update-supplier.use-case';
import { DeactivateSupplierController } from './application/deactivate-supplier/deactivate-supplier.controller';
import { DeactivateSupplierRepository } from './application/deactivate-supplier/deactivate-supplier.repository';
import { DeactivateSupplierService } from './application/deactivate-supplier/deactivate-supplier.service';
import { DeactivateSupplierUseCase } from './application/deactivate-supplier/deactivate-supplier.use-case';

import { ReactivateSupplierController } from './application/reactivate-supplier/reactivate-supplier.controller';
import { ReactivateSupplierRepository } from './application/reactivate-supplier/reactivate-supplier.repository';
import { ReactivateSupplierService } from './application/reactivate-supplier/reactivate-supplier.service';
import { ReactivateSupplierUseCase } from './application/reactivate-supplier/reactivate-supplier.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateSupplierController,
    DeactivateSupplierController,
    ReactivateSupplierController,
    ListSuppliersController,
    FindSupplierByIdController,
    UpdateSupplierController,
  ],
  providers: [
    CreateSupplierRepository,
    CreateSupplierService,
    CreateSupplierUseCase,
    FindSupplierByIdRepository,
    FindSupplierByIdService,
    FindSupplierByIdUseCase,
    ListSuppliersRepository,
    ListSuppliersService,
    ListSuppliersUseCase,
    UpdateSupplierRepository,
    UpdateSupplierService,
    UpdateSupplierUseCase,
    DeactivateSupplierRepository,
    DeactivateSupplierService,
    DeactivateSupplierUseCase,  
    ReactivateSupplierRepository,
    ReactivateSupplierService,
    ReactivateSupplierUseCase,
  ],
})
export class SuppliersModule {}