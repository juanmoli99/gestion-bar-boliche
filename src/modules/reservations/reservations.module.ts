import { Module } from '@nestjs/common';
import { ListReservationsController } from './application/list-reservations/list-reservations.controller';
import { ListReservationsRepository } from './application/list-reservations/list-reservations.repository';
import { ListReservationsService } from './application/list-reservations/list-reservations.service';
import { ListReservationsUseCase } from './application/list-reservations/list-reservations.use-case';
import { PrismaModule } from '../../core/database/prisma.module';

import { CreateReservationController } from './application/create-reservation/create-reservation.controller';
import { CreateReservationRepository } from './application/create-reservation/create-reservation.repository';
import { CreateReservationService } from './application/create-reservation/create-reservation.service';
import { CreateReservationUseCase } from './application/create-reservation/create-reservation.use-case';
import { UpdateReservationController } from './application/update-reservation/update-reservation.controller';
import { UpdateReservationRepository } from './application/update-reservation/update-reservation.repository';
import { UpdateReservationService } from './application/update-reservation/update-reservation.service';
import { UpdateReservationUseCase } from './application/update-reservation/update-reservation.use-case';
import { CancelReservationController } from './application/cancel-reservation/cancel-reservation.controller';
import { CancelReservationRepository } from './application/cancel-reservation/cancel-reservation.repository';
import { CancelReservationService } from './application/cancel-reservation/cancel-reservation.service';
import { CancelReservationUseCase } from './application/cancel-reservation/cancel-reservation.use-case';
import { ConfirmReservationController } from './application/confirm-reservation/confirm-reservation.controller';
import { ConfirmReservationRepository } from './application/confirm-reservation/confirm-reservation.repository';
import { ConfirmReservationService } from './application/confirm-reservation/confirm-reservation.service';
import { ConfirmReservationUseCase } from './application/confirm-reservation/confirm-reservation.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    CreateReservationController,
    UpdateReservationController,
    CancelReservationController,
    ConfirmReservationController,
    ListReservationsController

  ],
  providers: [
    ListReservationsRepository,
    ListReservationsUseCase,
    ListReservationsService,

    CancelReservationRepository,
    CancelReservationService,
    CancelReservationUseCase,

    CreateReservationRepository,
    CreateReservationService,
    CreateReservationUseCase,

    UpdateReservationRepository,
    UpdateReservationService,
    UpdateReservationUseCase,

    ConfirmReservationRepository,
    ConfirmReservationService,
    ConfirmReservationUseCase,
  ],
})
export class ReservationsModule {}