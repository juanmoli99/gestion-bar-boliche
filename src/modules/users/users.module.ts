import { Module } from '@nestjs/common';
import { ApplicationModule } from './application.module';

@Module({
  imports: [ApplicationModule]
})
export class UsersModule {}
