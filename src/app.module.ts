import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './core/config/config.module';
import { PrismaModule } from './core/database/prisma.module';
import { HealthModule } from './core/health/health.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
  ConfigModule,
  PrismaModule,
  HealthModule,
  UsersModule,
  AuthModule,
  ],
})
export class AppModule {}