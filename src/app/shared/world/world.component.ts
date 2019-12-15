import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {WorldManager} from '../../core/service/WorldManager';
import {canvas} from '../../core/service/world';
import {interval} from 'rxjs';
import {PlayerShipService} from '../../player/service/PlayerShipService';
import {EventDispatcher} from '../../event-dispatcher/service/EventDispatcher';

export const WORLD_INIT =  'world-init';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  title = 'navinha';

  @ViewChild('canvasContainer', { static: true })
  canvasContainer: ElementRef<HTMLCanvasElement>;

  fps = 60;

  constructor(
    private worldManager: WorldManager,
    private playerShipService: PlayerShipService,
    private eventDispatcher: EventDispatcher,
  ) {}

  ngOnInit(): void {
    this.canvasContainer.nativeElement.append(canvas);
    this.playerShipService.createAndDeployPlayerShip(0, 0);
    this.eventDispatcher.dispatch(WORLD_INIT, this.worldManager);

    interval(1000 / this.fps).subscribe(() => {
      this.worldManager.draw();
    });
  }
}
