import { Module } from '@nestjs/common';
import { DomainModule } from './domain.module';
import { InfrastructureModule } from './infrastructure.module';
import { PresentationModule } from './presentation.module';

@Module({
  imports: [DomainModule, InfrastructureModule, PresentationModule]
})
export class ApplicationModule {}
