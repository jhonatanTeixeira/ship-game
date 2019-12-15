import {inject, Inject, NgModule, Type} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventDispatcher} from './service/EventDispatcher';
import {EVENT_SUBSCRIBERS} from './decorator/event-subscriber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: EventDispatcher,
      useFactory: () => {
        const eventDispatcher = new EventDispatcher();

        EVENT_SUBSCRIBERS.forEach(subscriber => {
          const instance = inject(subscriber as Type<any>);

          eventDispatcher.addSubscriber(instance);
        });

        return eventDispatcher;
      }
    }
  ]
})
export class EventDispatcherModule { }
