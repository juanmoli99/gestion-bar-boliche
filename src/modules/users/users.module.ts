import { Module } from '@nestjs/common';
import { CreateUserRepository } from './application/create-user/create-user.repository';
import { PrismaModule } from '../../core/database/prisma.module';

import { CreateUserController } from './application/create-user/create-user.controller';
import { CreateUserService } from './application/create-user/create-user.service';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    CreateUserUseCase,
    CreateUserRepository,
  ],
})
export class UsersModule {}