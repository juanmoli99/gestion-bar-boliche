import { Module } from '@nestjs/common';
import { UpdateFreeBarRateController } from './application/update-free-bar-rate/update-free-bar-rate.controller';
import { UpdateFreeBarRateRepository } from './application/update-free-bar-rate/update-free-bar-rate.repository';
import { UpdateFreeBarRateService } from './application/update-free-bar-rate/update-free-bar-rate.service';
import { UpdateFreeBarRateUseCase } from './application/update-free-bar-rate/update-free-bar-rate.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { ListFreeBarRatesController } from './application/list-free-bar-rates/list-free-bar-rates.controller';
import { ListFreeBarRatesRepository } from './application/list-free-bar-rates/list-free-bar-rates.repository';
import { ListFreeBarRatesService } from './application/list-free-bar-rates/list-free-bar-rates.service';
import { ListFreeBarRatesUseCase } from './application/list-free-bar-rates/list-free-bar-rates.use-case';
import { CreateFreeBarRateController } from './application/create-free-bar-rate/create-free-bar-rate.controller';
import { CreateFreeBarRateRepository } from './application/create-free-bar-rate/create-free-bar-rate.repository';
import { CreateFreeBarRateService } from './application/create-free-bar-rate/create-free-bar-rate.service';
import { CreateFreeBarRateUseCase } from './application/create-free-bar-rate/create-free-bar-rate.use-case';
import { DeleteFreeBarRateController } from './application/delete-free-bar-rate/delete-free-bar-rate.controller';
import { DeleteFreeBarRateRepository } from './application/delete-free-bar-rate/delete-free-bar-rate.repository';
import { DeleteFreeBarRateService } from './application/delete-free-bar-rate/delete-free-bar-rate.service';
import { DeleteFreeBarRateUseCase } from './application/delete-free-bar-rate/delete-free-bar-rate.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateFreeBarRateController,
    ListFreeBarRatesController,
    UpdateFreeBarRateController,
    DeleteFreeBarRateController,
  ],
  providers: [
    ListFreeBarRatesRepository,
    ListFreeBarRatesService,
    ListFreeBarRatesUseCase,

    CreateFreeBarRateRepository,
    CreateFreeBarRateService,
    CreateFreeBarRateUseCase,

    UpdateFreeBarRateRepository,
    UpdateFreeBarRateService,
    UpdateFreeBarRateUseCase,

    DeleteFreeBarRateRepository,
    DeleteFreeBarRateService,
    DeleteFreeBarRateUseCase,
  ],
})
export class FreeBarRatesModule {}