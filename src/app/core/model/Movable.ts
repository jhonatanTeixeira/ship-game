import {Item} from './item';

export abstract class Movable extends Item {
  strength = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    readonly acceleration: number,
    readonly turnSpeed: number,
  ) {
    super(ctx, x, y, angle);
  }

  down() {
    this.strength -= this.acceleration;
  }

  left() {
    this.angle -= this.turnSpeed;
  }

  right() {
    this.angle += this.turnSpeed;
  }

  up() {
    this.strength += this.acceleration;
  }
}
