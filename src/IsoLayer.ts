import { IIsoObject } from "./objects/IsoObject";
import { Vector } from "p5";

class IsoLayer {
  readonly objects: IIsoObject[];

  constructor(objects: IIsoObject[]) {
    this.objects = objects;
  }

  addObject(obj: IIsoObject) {
    this.objects.push(obj);
  }

  draw(position: Vector): void {
    this.objects.forEach((obj) => {
      obj.draw(position);
    });
  }
}

export default IsoLayer;
