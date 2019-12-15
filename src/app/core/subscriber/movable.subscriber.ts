import {Injectable} from '@angular/core';
import {EventSubscriber} from '../../event-dispatcher/decorator/event-subscriber';
import {EventSubscriberInterface} from '../../event-dispatcher/service/EventSubscriberInterface';
import {BEFORE_DRAW_EVENT} from '../service/WorldManager';
import {World} from '../service/world';
import {Movable} from '../model/Movable';

@Injectable()
@EventSubscriber()
export class MovableSubscriber implements EventSubscriberInterface {
  subscribeTo = [
    {type: Movable, event: BEFORE_DRAW_EVENT}
  ];

  constructor(
    readonly world: World,
  ) {}

  listen(event: string, movable: Movable) {
    movable.moveToRadius(movable.strength);

    if (this.world.isOutOfBounds(movable)) {
      const maxRadius = this.world.maxRadius;
      const respawnPoint = movable.strength > 0 ? -(maxRadius - 1) : maxRadius - 1;
      movable.moveToRadius(respawnPoint);

      while (this.world.isOutOfBounds(movable)) {
        movable.moveToRadius(movable.strength > 0 ? 1 : -1);
      }
    }
  }
}
