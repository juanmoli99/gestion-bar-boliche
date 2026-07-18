import {
  Module,
} from '@nestjs/common';

import {
  PrismaModule,
} from '../../core/database/prisma.module';

import {
  CreateFormulaController,
} from './application/create-formula/create-formula.controller';

import {
  CreateFormulaRepository,
} from './application/create-formula/create-formula.repository';

import {
  CreateFormulaService,
} from './application/create-formula/create-formula.service';

import {
  CreateFormulaUseCase,
} from './application/create-formula/create-formula.use-case';

import {
  GetFormulaController,
} from './application/get-formula/get-formula.controller';

import {
  GetFormulaRepository,
} from './application/get-formula/get-formula.repository';

import {
  GetFormulaService,
} from './application/get-formula/get-formula.service';

import {
  GetFormulaUseCase,
} from './application/get-formula/get-formula.use-case';

import {
  ListFormulaItemsController,
} from './application/list-formula-items/list-formula-items.controller';

import {
  ListFormulaItemsRepository,
} from './application/list-formula-items/list-formula-items.repository';

import {
  ListFormulaItemsService,
} from './application/list-formula-items/list-formula-items.service';

import {
  ListFormulaItemsUseCase,
} from './application/list-formula-items/list-formula-items.use-case';

import {
  ListFormulasController,
} from './application/list-formulas/list-formulas.controller';

import {
  ListFormulasRepository,
} from './application/list-formulas/list-formulas.repository';

import {
  ListFormulasService,
} from './application/list-formulas/list-formulas.service';

import {
  ListFormulasUseCase,
} from './application/list-formulas/list-formulas.use-case';

import {
  UpdateFormulaController,
} from './application/update-formula/update-formula.controller';

import {
  UpdateFormulaRepository,
} from './application/update-formula/update-formula.repository';

import {
  UpdateFormulaService,
} from './application/update-formula/update-formula.service';

import {
  UpdateFormulaUseCase,
} from './application/update-formula/update-formula.use-case';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    CreateFormulaController,
    ListFormulasController,
    GetFormulaController,
    ListFormulaItemsController,
    UpdateFormulaController,
  ],

  providers: [
    CreateFormulaRepository,
    CreateFormulaService,
    CreateFormulaUseCase,

    ListFormulasRepository,
    ListFormulasService,
    ListFormulasUseCase,

    GetFormulaRepository,
    GetFormulaService,
    GetFormulaUseCase,

    ListFormulaItemsRepository,
    ListFormulaItemsService,
    ListFormulaItemsUseCase,

    UpdateFormulaRepository,
    UpdateFormulaService,
    UpdateFormulaUseCase,
  ],
})
export class FormulasModule {}