import {
  Controller,
  MessageEvent,
  Sse,
} from '@nestjs/common';

import {
  Observable,
} from 'rxjs';

import {
  DashboardEventsService,
} from './dashboard-events.service';

@Controller('dashboard')
export class DashboardEventsController {
  constructor(
    private readonly eventsService:
      DashboardEventsService,
  ) {}

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.eventsService.stream();
  }
}