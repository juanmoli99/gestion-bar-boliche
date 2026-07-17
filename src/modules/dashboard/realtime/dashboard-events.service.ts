import {
  Injectable,
  MessageEvent,
} from '@nestjs/common';

import {
  interval,
  map,
  merge,
  Observable,
  Subject,
} from 'rxjs';

export type RealtimeEventType =
  | 'dashboard.updated'
  | 'inventory.updated'
  | 'reservations.updated'
  | 'purchases.updated';

export interface RealtimeEventData {
  type: RealtimeEventType;
  occurredAt: string;
}

@Injectable()
export class DashboardEventsService {
  private readonly eventsSubject =
    new Subject<MessageEvent>();

  emit(type: RealtimeEventType): void {
    const data: RealtimeEventData = {
      type,
      occurredAt: new Date().toISOString(),
    };

    this.eventsSubject.next({
      type,
      data,
      id: crypto.randomUUID(),
    });
  }

  stream(): Observable<MessageEvent> {
    const heartbeat$ = interval(25_000).pipe(
      map(
        (): MessageEvent => ({
          type: 'heartbeat',
          data: {
            type: 'heartbeat',
            occurredAt:
              new Date().toISOString(),
          },
        }),
      ),
    );

    return merge(
      this.eventsSubject.asObservable(),
      heartbeat$,
    );
  }
}