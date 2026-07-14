import { Module } from '@nestjs/common';
import { AddFormulaItemController } from './application/add-formula-item/add-formula-item.controller';
import { AddFormulaItemRepository } from './application/add-formula-item/add-formula-item.repository';
import { AddFormulaItemService } from './application/add-formula-item/add-formula-item.service';
import { AddFormulaItemUseCase } from './application/add-formula-item/add-formula-item.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { ListFormulaItemsController } from './application/list-formula-items/list-formula-items.controller';
import { ListFormulaItemsRepository } from './application/list-formula-items/list-formula-items.repository';
import { ListFormulaItemsService } from './application/list-formula-items/list-formula-items.service';
import { ListFormulaItemsUseCase } from './application/list-formula-items/list-formula-items.use-case';
import { CreateFormulaController } from './application/create-formula/create-formula.controller';
import { CreateFormulaRepository } from './application/create-formula/create-formula.repository';
import { CreateFormulaService } from './application/create-formula/create-formula.service';
import { CreateFormulaUseCase } from './application/create-formula/create-formula.use-case';
import { CreateFormulaVersionController } from './application/create-formula-version/create-formula-version.controller';
import { CreateFormulaVersionRepository } from './application/create-formula-version/create-formula-version.repository';
import { CreateFormulaVersionService } from './application/create-formula-version/create-formula-version.service';
import { CreateFormulaVersionUseCase } from './application/create-formula-version/create-formula-version.use-case';
import { UpdateFormulaVersionItemController } from './application/update-formula-version-item/update-formula-version-item.controller';
import { UpdateFormulaVersionItemRepository } from './application/update-formula-version-item/update-formula-version-item.repository';
import { UpdateFormulaVersionItemService } from './application/update-formula-version-item/update-formula-version-item.service';
import { UpdateFormulaVersionItemUseCase } from './application/update-formula-version-item/update-formula-version-item.use-case';
import { DeleteFormulaVersionItemController } from './application/delete-formula-version-item/delete-formula-version-item.controller';
import { DeleteFormulaVersionItemRepository } from './application/delete-formula-version-item/delete-formula-version-item.repository';
import { DeleteFormulaVersionItemService } from './application/delete-formula-version-item/delete-formula-version-item.service';
import { DeleteFormulaVersionItemUseCase } from './application/delete-formula-version-item/delete-formula-version-item.use-case';
import { ListFormulasController } from './application/list-formulas/list-formulas.controller';
import { ListFormulasRepository } from './application/list-formulas/list-formulas.repository';
import { ListFormulasService } from './application/list-formulas/list-formulas.service';
import { ListFormulasUseCase } from './application/list-formulas/list-formulas.use-case';

import { GetFormulaController } from './application/get-formula/get-formula.controller';
import { GetFormulaRepository } from './application/get-formula/get-formula.repository';
import { GetFormulaService } from './application/get-formula/get-formula.service';
import { GetFormulaUseCase } from './application/get-formula/get-formula.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
  CreateFormulaController,
  AddFormulaItemController,
  ListFormulaItemsController,
  CreateFormulaVersionController,
  UpdateFormulaVersionItemController,
  DeleteFormulaVersionItemController,
  ListFormulasController,
  GetFormulaController,
  ],
  providers: [
    ListFormulasRepository,
    ListFormulasService,
    ListFormulasUseCase,

    GetFormulaRepository,
    GetFormulaService,
    GetFormulaUseCase,
    
    DeleteFormulaVersionItemRepository,
    DeleteFormulaVersionItemService,
    DeleteFormulaVersionItemUseCase,

    CreateFormulaRepository,
    CreateFormulaService,
    CreateFormulaUseCase,

    AddFormulaItemRepository,
    AddFormulaItemService,
    AddFormulaItemUseCase,

    ListFormulaItemsRepository,
    ListFormulaItemsService,
    ListFormulaItemsUseCase,

    CreateFormulaVersionRepository,
    CreateFormulaVersionService,
    CreateFormulaVersionUseCase,

    UpdateFormulaVersionItemRepository,
    UpdateFormulaVersionItemService,
    UpdateFormulaVersionItemUseCase,
  ],
})
export class FormulasModule {}