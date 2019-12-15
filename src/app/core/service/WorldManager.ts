import {Item} from '../model/item';
import {Injectable, Type} from '@angular/core';
import {World} from './world';
import {ItemFactory} from '../factory/ItemFactory';
import {EventDispatcher} from '../../event-dispatcher/service/EventDispatcher';
import {RemoteItem} from '../../multiplayer/model/RemoteItem';

export const BEFORE_DRAW_EVENT = 'before-render';
export const ITEM_DEPLOYED = 'item-deployed';

@Injectable({providedIn: 'root'})
export class WorldManager {
  constructor(
    readonly world: World,
    readonly itemFactory: ItemFactory,
    readonly eventDispatcher: EventDispatcher,
  ) {}

  deployItem(item: Item) {
    this.world.addItem(item);
  }

  createAndDeploy<T extends Item>(type: Type<T>, x: number, y: number, angle: number = 0, ...params) {
    const item = this.itemFactory.createItem(type, x, y, angle, ...params);
    this.eventDispatcher.dispatch(ITEM_DEPLOYED, item);
    this.deployItem(item);

    return item;
  }

  replaceItem(item: Item) {
    this.world.addItem(item);
  }

  isLocalItem(item: Item) {
    return item.id in this.world.items
      && !(this.world.items[item.id] instanceof RemoteItem);
  }

  draw() {
    this.world.forEach(item => this.eventDispatcher.dispatch(BEFORE_DRAW_EVENT, item));
    this.world.draw();
  }
}
