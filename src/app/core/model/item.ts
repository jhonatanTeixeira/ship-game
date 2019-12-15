import {Observable, Subscriber} from 'rxjs';
import {tap} from 'rxjs/operators';
import {canvas} from '../service/world';
import {Exclude, Expose, Transform} from 'class-transformer';

export const VALUE_CHANGED_EVENT = 'value-changed';

export abstract class Item {
  @Exclude()
  private _image: HTMLImageElement;
  @Exclude()
  private subscriber: Subscriber<Item>;
  @Exclude()
  private imageObservable = new Observable<Item>(subscriber => this.subscriber = subscriber);
  protected width = 20;
  protected heigth = 20;
  @Exclude()
  private ready = false;
  readonly id;
  readonly imageUrl: string;

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public angle: number,
  ) {
    this.id = new Date().getTime();
  }

  get image() {
    this.loadImage();

    return this._image;
  }

  private loadImage() {
    if (!this._image) {
      this._image = new Image();
      this._image.onload = () => this.subscriber.next(this);
      this._image.src = this.imageUrl;
    }
  }

  onReady(): Observable<Item> {
    this.loadImage();

    if (this.ready) {
      this.subscriber.next(this);
    }

    return this.imageObservable.pipe(tap(_ => this.ready = true));
  }

  draw() {
    this.onReady()
      .subscribe(_ => {
        this.drawImage();
      });
  }

  private drawImage() {
    this.ctx.save();
    this.ctx.translate(this.x + (canvas.width / 2), this.y + (canvas.height / 2));
    this.ctx.rotate(this.angle * Math.PI / 180);
    this.ctx.drawImage(
      this.image,
      -(this.width / 2),
      -(this.heigth / 2),
      this.width,
      this.heigth,
    );

    this.ctx.restore();
  }

  moveToRadius(radius: number) {
    this.x += radius * Math.sin(this.angle * Math.PI / 180);
    this.y -= radius * Math.cos(this.angle * Math.PI / 180);
  }
}
