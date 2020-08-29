import IsoObject from "./objects/IsoObject";
import { Vector } from "p5";

class IsoLayer {
  readonly objects: IsoObject[];

  constructor(objects: IsoObject[]) {
    this.objects = objects;
  }

  draw(position: Vector): void {
    this.objects.forEach((obj) => {
      obj.draw(position);
    });
  }
}

export default IsoLayer;
