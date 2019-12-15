import {Injectable, Type} from '@angular/core';
import {Item, VALUE_CHANGED_EVENT} from '../model/item';
import {EventDispatcher} from '../../event-dispatcher/service/EventDispatcher';

@Injectable({providedIn: 'root'})
export class ItemFactory {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly eventDispatcher: EventDispatcher,
  ) {}

  createItem<T extends Item>(type: Type<T>, x: number, y: number, angle = 0, ...params: any): T {
    return this.createProxy(new type(this.ctx, x, y, angle, ...params));
  }

  createProxy<T extends object>(object: T): T {
    return new Proxy(object, {
      set: (target: T, prop: string, value: any) => {
        target[prop] = value;
        this.eventDispatcher.dispatch<T>(VALUE_CHANGED_EVENT, target);

        return true;
      }
    });
  }
}
