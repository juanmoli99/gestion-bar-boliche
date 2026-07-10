import { Module } from '@nestjs/common';
import { CreateUserRepository } from './application/create-user/create-user.repository';
import { PrismaModule } from '../../core/database/prisma.module';
import { FindUserByIdController } from './application/find-user-by-id/find-user-by-id.controller';
import { FindUserByIdRepository } from './application/find-user-by-id/find-user-by-id.repository';
import { FindUserByIdUseCase } from './application/find-user-by-id/find-user-by-id.use-case';
import { CreateUserController } from './application/create-user/create-user.controller';
import { CreateUserService } from './application/create-user/create-user.service';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
  CreateUserController,
  FindUserByIdController,
  ],
  providers: [
  CreateUserRepository,
  CreateUserService,
  CreateUserUseCase,
  FindUserByIdRepository,
  FindUserByIdUseCase,
  ],
})
export class UsersModule {}