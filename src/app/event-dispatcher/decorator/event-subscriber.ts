import {Type} from '@angular/core';

export const EVENT_SUBSCRIBERS: Array<Type<any>> = [];

export function EventSubscriber() {
  return (constructor) => {
    EVENT_SUBSCRIBERS.push(constructor);
  };
}
