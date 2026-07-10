import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { ConfigModule } from './core/config/config.module';
import { HealthModule } from './core/health/health.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}