import {Injectable} from '@angular/core';
import {EventSubscriber} from '../../event-dispatcher/decorator/event-subscriber';
import {EventSubscriberInterface} from '../../event-dispatcher/service/EventSubscriberInterface';
import {Item} from '../../core/model/item';
import {BEFORE_DRAW_EVENT, ITEM_DEPLOYED} from '../../core/service/WorldManager';
import {SocketClient} from '../service/SocketClient';

@Injectable()
@EventSubscriber()
export class LocalItemsPublisher implements EventSubscriberInterface {
  subscribeTo = [
    {type: Item, event: BEFORE_DRAW_EVENT},
    {type: Item, event: ITEM_DEPLOYED},
  ];

  constructor(
    readonly socketClient: SocketClient
  ) {}

  listen(event: string, payload: Item) {
    this.socketClient.publishItem(payload);
  }
}
