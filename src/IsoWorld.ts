import IsoLayer from "./IsoLayer";
import { _P5 } from "./IsoP5";
import IsoCube from "./IsoCube";
import IsoCubeMap from "./IsoCubeMap";
import { Vector } from "p5";

class IsoWorld {
  startPosition: Vector;
  position: Vector;

  height: number;
  width: number;

  readonly goldenRatio: number;

  private squareLength: number;
  private squareHeight: number;
  private squareWidth: number;

  private underlayers: Map<number, IsoLayer>;
  private overlayers: Map<number, IsoLayer>;
  private cubes: IsoCubeMap;

  constructor(
    x: number,
    y: number,
    squares: number,
    squareHeight: number,
    squareWidth: number
  ) {
    this.squareLength = squares;
    this.position = _P5.createVector(x, y);
    this.startPosition = _P5.createVector(x, y);
    this.goldenRatio = squareWidth / squareHeight;
    this.squareHeight = squareHeight;
    this.squareWidth = squareWidth;

    this.underlayers = new Map();
    this.overlayers = new Map();

    this.cubes = generateCubeMatrix(this, squares, squareHeight, squareWidth);
  }

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

  draw(): void {
    this.underlayers.forEach((layer) => {
      layer.draw(this.position);
    });

    this.cubes.forEach((square: IsoCube) => {
      square.draw(this.position);
    });

    this.overlayers.forEach((layer) => {
      layer.draw(this.position);
    });
  }

  getCube(x: number, y: number): IsoCube {
    return this.cubes.getCube(x, y);
  }
}

// helpers
export const generateCubeMatrix = (
  world: IsoWorld,
  squares: number,
  squareHeight: number,
  squareWidth: number
): IsoCubeMap => {
  const matrix = new IsoCubeMap();
  const totalRowLength = squares * 2 - 1;

  let totalColumnsLength, currentY, currentX;

  const rowStep = squareHeight / 2; // Drawing starts from center so the step should be in the center of each square.
  const columnStep = squareWidth / 2;

  const startY = (squares / 2) * squareHeight + rowStep;
  const middle = Math.floor(totalRowLength / 2);

  // Generate top part of isometric world
  for (let row = 0; row <= middle; row++) {
    totalColumnsLength = row + 1; // Start with a single column at the top. Decreases after reaching middle.

    currentY = startY + row * rowStep;
    currentX = (totalColumnsLength / 2) * squareWidth + columnStep; // Start with a centralized X

    for (let column = 0; column < totalColumnsLength; column++) {
      matrix.setCube(
        row - column,
        column,
        new IsoCube(world, {
          x: currentX,
          y: currentY,
          height: squareHeight,
          width: squareWidth
        })
      );

      currentX += squareWidth;
    }
  }

  // Generate bottom part of isometric world
  for (let row = middle; row > 0; row--) {
    totalColumnsLength = row;

    currentY = (middle - row + 1) * rowStep;
    currentX = (totalColumnsLength / 2) * squareWidth + columnStep; // Start with a centralized X

    for (let column = 1; column <= totalColumnsLength; column++) {
      matrix.setCube(
        squares - column,
        column + (squares - totalColumnsLength) - 1,
        new IsoCube(world, {
          x: currentX,
          y: currentY,
          height: squareHeight,
          width: squareWidth
        })
      );
      currentX += squareWidth;
    }
  }

  return matrix;
};

export default IsoWorld;
