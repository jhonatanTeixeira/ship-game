import {EventDispatcher} from './EventDispatcher';

export interface EventSubscriberInterface {
  subscribeTo: Array<{type?: any, event: string, method?: string}>;

  listen(event: string, payload: any, eventDispatcher?: EventDispatcher);
}
