import { Module } from '@nestjs/common';
import { ListReservationsController } from './application/list-reservations/list-reservations.controller';
import { ListReservationsRepository } from './application/list-reservations/list-reservations.repository';
import { ListReservationsService } from './application/list-reservations/list-reservations.service';
import { ListReservationsUseCase } from './application/list-reservations/list-reservations.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { GetReservationController } from './application/get-reservation/get-reservation.controller';
import { GetReservationRepository } from './application/get-reservation/get-reservation.repository';
import { GetReservationService } from './application/get-reservation/get-reservation.service';
import { GetReservationUseCase } from './application/get-reservation/get-reservation.use-case';
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
import { ReservationHistoryRepository } from './application/reservation-history/reservation-history.repository';
import { ReservationHistoryService } from './application/reservation-history/reservation-history.service';
import { UpdateReservationStatusController } from './application/update-reservation-status/update-reservation-status.controller';
import { UpdateReservationStatusRepository } from './application/update-reservation-status/update-reservation-status.repository';
import { UpdateReservationStatusService } from './application/update-reservation-status/update-reservation-status.service';
import { UpdateReservationStatusUseCase } from './application/update-reservation-status/update-reservation-status.use-case';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    GetReservationController,
    CreateReservationController,
    UpdateReservationController,
    CancelReservationController,
    ConfirmReservationController,
    ListReservationsController,
    UpdateReservationStatusController,

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

    GetReservationRepository,
    GetReservationService,
    GetReservationUseCase,

    ReservationHistoryRepository,
    ReservationHistoryService,

    UpdateReservationStatusRepository,
    UpdateReservationStatusService,
    UpdateReservationStatusUseCase,
  ],
})
export class ReservationsModule {}