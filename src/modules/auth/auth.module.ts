import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from '../../core/config/config.module';

import { LoginController } from './application/login/login.controller';
import { LoginService } from './application/login/login.service';
import { LoginUseCase } from './application/login/login.use-case';

import { RefreshTokenController } from './application/refresh-token/refresh-token.controller';
import { RefreshTokenService } from './application/refresh-token/refresh-token.service';
import { RefreshTokenUseCase } from './application/refresh-token/refresh-token.use-case';

import { AuthPrismaRepository } from './infrastructure/repositories/auth.prisma.repository';
import { JwtStrategy } from './infrastructure/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [
    LoginController,
    RefreshTokenController,
  ],
  providers: [
    AuthPrismaRepository,

    LoginService,
    LoginUseCase,

    RefreshTokenService,
    RefreshTokenUseCase,

    JwtStrategy,
  ],
  exports: [
    JwtModule,
    PassportModule,
    JwtStrategy,
  ],
})
export class AuthModule {}