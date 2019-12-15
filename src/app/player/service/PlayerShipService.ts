import {Injectable} from '@angular/core';
import {WorldManager} from '../../core/service/WorldManager';
import {Ship} from '../../core/model/ship';

@Injectable({providedIn: 'root'})
export class PlayerShipService {
  playerShip: Ship;

  constructor(
    readonly worldManager: WorldManager,
  ) {}

  createAndDeployPlayerShip(x: number, y: number, acceleration = 2, turnSpeed = 4) {
    this.playerShip = this.worldManager.createAndDeploy(Ship, x, y, 0, acceleration, turnSpeed);

    window.addEventListener('keydown', this.keyDown.bind(this));

    return this.playerShip;
  }

  keyDown(event) {
    if (event.key === 'd') {
      this.playerShip.right();
    }

    if (event.key === 'a') {
      this.playerShip.left();
    }

    if (event.key === 'w') {
      this.playerShip.up();
    }

    if (event.key === 's') {
      this.playerShip.down();
    }
  }
}
