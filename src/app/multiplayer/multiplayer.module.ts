import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalItemsPublisher} from './subscriber/LocalItemsPublisher';
import {RemoteItemSubscriber} from './subscriber/RemoteItemSubscriber';
import {CoreModule} from '../core/core.module';
import {EventDispatcherModule} from '../event-dispatcher/event-dispatcher.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
  ],
  providers: [
    LocalItemsPublisher,
    RemoteItemSubscriber,
  ]
})
export class MultiplayerModule { }
