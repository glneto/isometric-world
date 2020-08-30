import IsoLayer from "./IsoLayer";
import { _P5 } from "./IsoP5";
import { Vector } from "p5";
interface IsoWorldConstructorParams {
  /**
   * The world x position.
   */
  x: number;

  /**
   * The world y position.
   */
  y: number;
}

class IsoWorld {
  currentPosition: Vector;
  startPosition: Vector;

  private layers: IsoLayer[];

  constructor({ x, y }: IsoWorldConstructorParams) {
    this.currentPosition = _P5.createVector(x, y);
    this.startPosition = _P5.createVector(x, y);

    this.layers = [];
  }

  addLayer(layer: IsoLayer) {
    this.layers.push(layer);
  }

  insertLayer(index: number, layer: IsoLayer) {
    this.layers.splice(index, 0, layer);
  }

  /*
  move(x: number, y: number): void {
    this.position.set(x, y);
    this.cubes = generateCubeMatrix(
      this,
      this.squareLength,
      this.squareHeight,
      this.squareWidth
    );
  }

  getTopCorner(): IsoCube {
    return this.getCube(0, 0);
  }

  getBottomCorner(): IsoCube {
    return this.getCube(this.squareLength - 1, this.squareLength - 1);
  }

  getLeftCorner(): IsoCube {
    return this.getCube(this.squareLength - 1, 0);
  }

  getRightCorner(): IsoCube {
    return this.getCube(0, this.squareLength - 1);
  }

  setLayer(position: number, layer: IsoLayer): void {
    if (position < 0) this.underlayers.set(position, layer);
    else this.overlayers.set(position, layer);
  }
*/
  draw(): void {
    this.layers.forEach((layer: IsoLayer) => {
      layer.draw(this.currentPosition);
    });
  }
}

export default IsoWorld;
