import {Injectable} from '@angular/core';
import {EventSubscriber} from '../../event-dispatcher/decorator/event-subscriber';
import {EventSubscriberInterface} from '../../event-dispatcher/service/EventSubscriberInterface';
import {WORLD_INIT} from '../../shared/world/world.component';
import {WorldManager} from '../../core/service/WorldManager';
import {SocketClient} from '../service/SocketClient';
import {RemoteItem} from '../model/RemoteItem';

@Injectable()
@EventSubscriber()
export class RemoteItemSubscriber implements EventSubscriberInterface {
  subscribeTo: Array<{ type?: any; event: string; method?: string }> = [
    {event: WORLD_INIT},
  ];

  constructor(
    private socketClient: SocketClient,
  ) {}

  listen(event: string, payload: WorldManager) {
    this.socketClient.listenItem().subscribe((item: RemoteItem) => {
      if (!payload.isLocalItem(item)) {
        payload.replaceItem(item);
      }
    });
  }

}
