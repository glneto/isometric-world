import { Vector } from "p5";
import { _P5 } from "../IsoP5";
import Quad from "../interfaces/Quad";
import IsoWorld from "../IsoWorld";

export interface IIsoObject {
  draw(position: Vector): void;
}

abstract class IsoObject implements IIsoObject {
  protected strokeColor: number[];
  protected fillColor: number[];
  protected world: IsoWorld;

  abstract getCollisionBlock(): Quad;
  abstract reposition(position: Vector): void;

  constructor(world: IsoWorld) {
    this.world = world;
  }

  setStrokeColor(color: number[] = [0, 0, 0]): IsoObject {
    this.strokeColor = color;
    _P5.stroke(this.strokeColor);

    return this;
  }

  setFillColor(color: number[] = [255, 255, 255]): IsoObject {
    this.fillColor = color;
    _P5.fill(this.fillColor);

    return this;
  }

  draw(position: Vector): void {
    this.reposition(position);
  }
}

export default IsoObject;
