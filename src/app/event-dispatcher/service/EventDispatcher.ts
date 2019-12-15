import {Observable, Subject} from 'rxjs';
import {EventSubscriberInterface} from './EventSubscriberInterface';

export class EventDispatcher {
  private subjects: {[name: string]: Subject<any>} = {};

  dispatch<T>(event: string, payload: T) {
    this.createSubjectIfNeeded<T>(event);

    this.subjects[event].next(payload);
  }

  select<T>(event): Observable<T> {
    this.createSubjectIfNeeded<T>(event);

    return this.subjects[event];
  }

  addSubscriber(subscriber: EventSubscriberInterface) {
    subscriber.subscribeTo.forEach(event =>
      this.select(event.event).subscribe(payload => {
        if (event.type && !(payload.constructor.prototype instanceof event.type)) {
          return;
        }

        const method = event.method || 'listen';

        subscriber[method](event.event, payload as any, this);
      })
    );
  }

  private createSubjectIfNeeded<T>(event) {
    if (!(event in this.subjects)) {
      this.subjects[event] = new Subject<T>();
    }
  }
}
