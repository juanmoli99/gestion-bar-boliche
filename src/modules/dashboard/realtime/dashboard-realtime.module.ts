import {
  Global,
  Module,
} from '@nestjs/common';

import {
  DashboardEventsController,
} from './dashboard-events.controller';

import {
  DashboardEventsService,
} from './dashboard-events.service';

@Global()
@Module({
  controllers: [
    DashboardEventsController,
  ],
  providers: [
    DashboardEventsService,
  ],
  exports: [
    DashboardEventsService,
  ],
})
export class DashboardRealtimeModule {}