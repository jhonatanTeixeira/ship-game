import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldComponent } from './world/world.component';
import { PlayerModule } from '../player/player.module';
import { MultiplayerModule } from '../multiplayer/multiplayer.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [WorldComponent],
  imports: [
    CommonModule,
    PlayerModule,
    MultiplayerModule,
    CoreModule,
  ],
  exports: [
    WorldComponent
  ],
})
export class SharedModule { }
