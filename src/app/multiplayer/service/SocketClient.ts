import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Item} from '../../core/model/item';
import {classToPlain, plainToClass, plainToClassFromExist} from 'class-transformer';
import {Observable, Subject} from 'rxjs';
import {RemoteItem} from '../model/RemoteItem';

@Injectable({providedIn: 'root'})
export class SocketClient {
  readonly socket = io(environment.ws_server);

  constructor(
    readonly ctx: CanvasRenderingContext2D,
  ) {}

  publishItem(item: Item) {
    this.socket.emit('local-item', classToPlain(item));
  }

  listenItem(): Observable<RemoteItem> {
    const subject = new Subject<RemoteItem>();

    this.socket.on('remote-item', (payload) => {
      payload.ctx = this.ctx;
      const remoteItem = new RemoteItem(this.ctx, payload.x, payload.y, payload.angle);
      subject.next(plainToClassFromExist(remoteItem, payload));
    });

    return subject;
  }
}
