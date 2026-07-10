import { Module } from '@nestjs/common';
import { CreateUserRepository } from './application/create-user/create-user.repository';
import { PrismaModule } from '../../core/database/prisma.module';
import { FindUserByIdController } from './application/find-user-by-id/find-user-by-id.controller';
import { FindUserByIdRepository } from './application/find-user-by-id/find-user-by-id.repository';
import { FindUserByIdUseCase } from './application/find-user-by-id/find-user-by-id.use-case';
import { CreateUserController } from './application/create-user/create-user.controller';
import { CreateUserService } from './application/create-user/create-user.service';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';
import { ListUsersController } from './application/list-users/list-users.controller';
import { ListUsersRepository } from './application/list-users/list-users.repository';
import { ListUsersUseCase } from './application/list-users/list-users.use-case';
import { UpdateUserController } from './application/update-user/update-user.controller';
import { UpdateUserRepository } from './application/update-user/update-user.repository';
import { UpdateUserUseCase } from './application/update-user/update-user.use-case';
import { DeactivateUserController } from './application/deactivate-user/deactivate-user.controller';
import { DeactivateUserRepository } from './application/deactivate-user/deactivate-user.repository';
import { DeactivateUserUseCase } from './application/deactivate-user/deactivate-user.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
  CreateUserController,
  FindUserByIdController,
  ListUsersController,
  UpdateUserController,
  DeactivateUserController,
  ],
  providers: [
  CreateUserRepository,
  CreateUserService,
  CreateUserUseCase,
  FindUserByIdRepository,
  FindUserByIdUseCase,
  ListUsersRepository,
  ListUsersUseCase,
  UpdateUserRepository,
  UpdateUserUseCase,
  DeactivateUserRepository,
  DeactivateUserUseCase,
  ], 
})
export class UsersModule {}