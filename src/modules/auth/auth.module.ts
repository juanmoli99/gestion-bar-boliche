import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '../../core/config/config.module';

import { LoginController } from './application/login/login.controller';
import { LoginService } from './application/login/login.service';
import { LoginUseCase } from './application/login/login.use-case';

import { AuthPrismaRepository } from './infrastructure/repositories/auth.prisma.repository';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [
    LoginController,
  ],
  providers: [
    LoginService,
    LoginUseCase,
    AuthPrismaRepository,
  ],
  exports: [
    JwtModule,
  ],
})
export class AuthModule {}