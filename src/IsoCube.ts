import { _P5 } from "./IsoP5";
import Quad from "./interfaces/Quad";
import Collision from "./utils/collision";
import Drawing from "./utils/drawing";
import { Vector } from "p5";
import { IIsoObject } from "./objects/IsoObject";
import QuadUtils from "./utils/quad";

interface IsoCubeEventFunc {
  (cube: IsoCube): void;
}

interface IsoCubeOpts {
  position: Vector;
  height?: number;
  width?: number;
  depth?: number;
  onMouseOver?: IsoCubeEventFunc;
}

class IsoCube implements IIsoObject {
  readonly height: number;
  readonly width: number;

  /**
   * The cube height. (Distance between top quad and base quad)
   */
  readonly depth: number;

  private position: Vector;
  topQuad: Quad;
  baseQuad: Quad;

  onMouseOver: IsoCubeEventFunc;

  // Dynamic props
  baseColor: number[] = [255, 255, 255];
  strokeColor: number[] = [0, 0, 0];
  strokeWeight = 2;

  constructor({ position, height, width, depth, onMouseOver }: IsoCubeOpts) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.depth = depth || 50;
    this.onMouseOver = onMouseOver;
  }

  setBaseColor(color: number[]): void {
    this.baseColor = color;
  }

  setStrokeWeight(value: number): void {
    this.strokeWeight = value;
  }

  private drawCubeSideQuads() {
    // Left side
    Drawing.quad({
      left: this.topQuad.left,
      top: this.topQuad.bottom,
      right: this.baseQuad.bottom,
      bottom: this.baseQuad.left
    });

    // Right side
    Drawing.quad({
      left: this.topQuad.bottom,
      top: this.topQuad.right,
      right: this.baseQuad.right,
      bottom: this.baseQuad.bottom
    });
  }

  setTopAndBaseQuad(basePosition: Vector): void {
    const { x, y } = this.position;

    this.topQuad = {
      top: _P5.createVector(
        basePosition.x + x,
        basePosition.y + y - this.height / 2
      ),
      bottom: _P5.createVector(
        basePosition.x + x,
        basePosition.y + y + this.height / 2
      ),
      left: _P5.createVector(
        basePosition.x + x - this.width / 2,
        basePosition.y + y
      ),
      right: _P5.createVector(
        basePosition.x + x + this.width / 2,
        basePosition.y + y
      )
    };

    this.baseQuad = QuadUtils.cloneAndMoveQuad(
      this.topQuad,
      _P5.createVector(0, this.depth)
    );
  }

  reposition(worldPosition: Vector): void {
    this.setTopAndBaseQuad(worldPosition);
  }

  getCollisionBlock(): Quad {
    return this.topQuad;
  }

  draw(position: Vector): void {
    this.reposition(position);

    _P5.strokeWeight(this.strokeWeight);
    _P5.rectMode(_P5.CENTER);
    _P5.fill(this.baseColor);
    _P5.stroke(this.strokeColor);

    Drawing.quad(this.baseQuad);
    this.drawCubeSideQuads();

    if (this.onMouseOver && isMouseOver(this.topQuad)) {
      this.onMouseOver(this);
    }

    Drawing.quad(this.topQuad);
  }
}

// helpers
const isMouseOver = (quad: Quad) => {
  return Collision.isPointCollidingQuad(_P5.mouseX, _P5.mouseY, quad);
};

export default IsoCube;
