import {
  Module,
} from '@nestjs/common';

import {
  PrismaModule,
} from '../../core/database/prisma.module';


import {
  CreateCookingFormulaController,
} from './application/create-cooking-formula/create-cooking-formula.controller';

import {
  CreateCookingFormulaRepository,
} from './application/create-cooking-formula/create-cooking-formula.repository';

import {
  CreateCookingFormulaService,
} from './application/create-cooking-formula/create-cooking-formula.service';

import {
  CreateCookingFormulaUseCase,
} from './application/create-cooking-formula/create-cooking-formula.use-case';

import {
  UpdateCookingFormulaController,
} from './application/update-cooking-formula/update-cooking-formula.controller';

import {
  UpdateCookingFormulaRepository,
} from './application/update-cooking-formula/update-cooking-formula.repository';

import {
  UpdateCookingFormulaService,
} from './application/update-cooking-formula/update-cooking-formula.service';

import {
  UpdateCookingFormulaUseCase,
} from './application/update-cooking-formula/update-cooking-formula.use-case';

import {
  DeactivateCookingFormulaController,
} from './application/deactivate-cooking-formula/deactivate-cooking-formula.controller';

import {
  DeactivateCookingFormulaRepository,
} from './application/deactivate-cooking-formula/deactivate-cooking-formula.repository';

import {
  DeactivateCookingFormulaService,
} from './application/deactivate-cooking-formula/deactivate-cooking-formula.service';

import {
  DeactivateCookingFormulaUseCase,
} from './application/deactivate-cooking-formula/deactivate-cooking-formula.use-case';

import {
  GetPizzaProductionConfigurationController,
} from './application/get-pizza-production-configuration/get-pizza-production-configuration.controller';

import {
  GetPizzaProductionConfigurationService,
} from './application/get-pizza-production-configuration/get-pizza-production-configuration.service';

import {
  CalculatePizzaProductionController,
} from './application/calculate-pizza-production/calculate-pizza-production.controller';

import {
  CalculatePizzaProductionRepository,
} from './application/calculate-pizza-production/calculate-pizza-production.repository';

import {
  CalculatePizzaProductionService,
} from './application/calculate-pizza-production/calculate-pizza-production.service';

import {
  CalculatePizzaProductionUseCase,
} from './application/calculate-pizza-production/calculate-pizza-production.use-case';

import {
  UpdatePizzaProductionConfigurationController,
} from './application/update-pizza-production-configuration/update-pizza-production-configuration.controller';

import {
  UpdatePizzaProductionConfigurationService,
} from './application/update-pizza-production-configuration/update-pizza-production-configuration.service';

import {
  ListCookingFormulasController,
} from './application/list-cooking-formulas/list-cooking-formulas.controller';

import {
  ListCookingFormulasRepository,
} from './application/list-cooking-formulas/list-cooking-formulas.repository';

import {
  ListCookingFormulasService,
} from './application/list-cooking-formulas/list-cooking-formulas.service';

import {
  ListCookingFormulasUseCase,
} from './application/list-cooking-formulas/list-cooking-formulas.use-case';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    GetPizzaProductionConfigurationController,
    UpdatePizzaProductionConfigurationController,
    CalculatePizzaProductionController,

    CreateCookingFormulaController,
    UpdateCookingFormulaController,
    DeactivateCookingFormulaController,
    ListCookingFormulasController,

  ],

  providers: [
    GetPizzaProductionConfigurationService,
    UpdatePizzaProductionConfigurationService,

    CalculatePizzaProductionRepository,
    CalculatePizzaProductionService,
    CalculatePizzaProductionUseCase,

    CreateCookingFormulaRepository,
    CreateCookingFormulaService,
    CreateCookingFormulaUseCase,

    UpdateCookingFormulaRepository,
    UpdateCookingFormulaService,
    UpdateCookingFormulaUseCase,

    DeactivateCookingFormulaRepository,
    DeactivateCookingFormulaService,
    DeactivateCookingFormulaUseCase,

    ListCookingFormulasRepository,
    ListCookingFormulasService,
    ListCookingFormulasUseCase,
  ],
})
export class CookingFormulasModule {}