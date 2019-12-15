import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorldManager} from './service/WorldManager';
import {EventDispatcherModule} from '../event-dispatcher/event-dispatcher.module';
import {canvas} from './service/world';
import {MovableSubscriber} from './subscriber/movable.subscriber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventDispatcherModule,
  ],
  providers: [
    WorldManager,
    MovableSubscriber,
    {
      provide: CanvasRenderingContext2D,
      useFactory: () => canvas.getContext('2d'),
    }
  ]
})
export class CoreModule { }
