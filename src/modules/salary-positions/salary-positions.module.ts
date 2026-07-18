import { Module } from '@nestjs/common';
import { UpdateSalaryPositionController } from './application/update-salary-position/update-salary-position.controller';
import { UpdateSalaryPositionRepository } from './application/update-salary-position/update-salary-position.repository';
import { UpdateSalaryPositionService } from './application/update-salary-position/update-salary-position.service';
import { UpdateSalaryPositionUseCase } from './application/update-salary-position/update-salary-position.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { CreateSalaryPositionController } from './application/create-salary-position/create-salary-position.controller';
import { CreateSalaryPositionRepository } from './application/create-salary-position/create-salary-position.repository';
import { CreateSalaryPositionService } from './application/create-salary-position/create-salary-position.service';
import { CreateSalaryPositionUseCase } from './application/create-salary-position/create-salary-position.use-case';
import { ListSalaryPositionsController } from './application/list-salary-positions/list-salary-positions.controller';
import { ListSalaryPositionsRepository } from './application/list-salary-positions/list-salary-positions.repository';
import { ListSalaryPositionsService } from './application/list-salary-positions/list-salary-positions.service';
import { ListSalaryPositionsUseCase } from './application/list-salary-positions/list-salary-positions.use-case';
import { DeleteSalaryPositionController } from './application/delete-salary-position/delete-salary-position.controller';
import { DeleteSalaryPositionRepository } from './application/delete-salary-position/delete-salary-position.repository';
import { DeleteSalaryPositionService } from './application/delete-salary-position/delete-salary-position.service';
import { DeleteSalaryPositionUseCase } from './application/delete-salary-position/delete-salary-position.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
    UpdateSalaryPositionController,
    ListSalaryPositionsController,
    CreateSalaryPositionController,
    DeleteSalaryPositionController,
  ],
  providers: [
    DeleteSalaryPositionRepository,
    DeleteSalaryPositionService,
    DeleteSalaryPositionUseCase,
    
    UpdateSalaryPositionRepository,
    UpdateSalaryPositionService,
    UpdateSalaryPositionUseCase,

    ListSalaryPositionsRepository,
    ListSalaryPositionsService,
    ListSalaryPositionsUseCase,

    CreateSalaryPositionRepository,
    CreateSalaryPositionService,
    CreateSalaryPositionUseCase,
  ],
})
export class SalaryPositionsModule {}