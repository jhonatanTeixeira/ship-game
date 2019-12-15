import {Item} from '../model/item';
import {Injectable} from '@angular/core';

export const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const maxX = canvas.width / 2;
const minX = -maxX;
const maxY = canvas.height / 2;
const minY = -maxY;

@Injectable({providedIn: 'root'})
export class World {
  // items: Item[] = [];
  items: {[id: number]: Item} = {};

  constructor(
    readonly ctx: CanvasRenderingContext2D
  ) {}

  addItem(item: Item) {
    // this.items.push(item);
    this.items[item.id] = item;
  }

  getById(id: number): Item {
    return (id in this.items && this.items[id]) || null;
  }

  forEach(callback: (item: Item) => any) {
    for (const id in this.items) {
      callback(this.items[id]);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.forEach(item => item.draw());
  }

  get maxX() {
    return maxX;
  }

  get maxY() {
    return maxY;
  }

  get minX() {
    return minX;
  }

  get minY() {
    return minY;
  }

  isOutOfBounds(item: Item) {
    return item.x >= maxX || item.x <= minX || item.y >= maxY || item.y <= minY;
  }

  get maxRadius() {
    return canvas.width > canvas.height ? canvas.width : canvas.height;
  }
}
