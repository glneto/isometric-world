import { Vector } from "p5";
import Quad from "../interfaces/Quad";
import { _P5 } from "../IsoP5";
import IsoObject from "./IsoObject";
import Compass from "../utils/compass";
import CompassDirection from "../enum/compass";
import IsoWorld from "../IsoWorld";
import Drawing from "../utils/drawing";
import Collision from "../utils/collision";

class Wall extends IsoObject {
  TYPE = "WALL";

  readonly world: IsoWorld;
  readonly left: Vector;
  readonly right: Vector;
  readonly height: number;
  readonly direction: CompassDirection;
  readonly thickness: number;

  topQuad: Quad;
  leftQuad: Quad;
  rightQuad: Quad;
  baseQuad: Quad;

  sideQuad: Quad;

  constructor(
    world: IsoWorld,
    left: Vector,
    right: Vector,
    height: number,
    thickness?: number
  ) {
    super(world);

    this.left = left;
    this.right = right;
    this.height = height;
    this.direction = Compass.getDirection(left, right);
    this.thickness = thickness || 10;
    this.world = world;
  }

  private setLeftQuad(position: Vector) {
    const directionX = this.direction === CompassDirection.NORTHEAST ? 1 : -1;
    const directionY = Compass.isEastDirection(this.direction) ? 1 : -1;

    // ie.: -5 if wall is on the right side, so the opposite block is on the left of it,
    // otherwise 5 if wall is on the left side of the screen, so the opposite block should be on the right side of it
    const oppositeBlockXDifference =
      this.thickness * this.world.goldenRatio * directionX;

    // ie.: 5 * 1.5 * -1 if wall is on the bottom part of the screen, so the opposite block should be above it (-y)
    // otherwise 5 * 1.5 * 1 if wall is on the top part of the screen, so the opposite block should be below it.
    const oppositeBlockYDifference = this.thickness * directionY;

    this.leftQuad = {
      left: _P5
        .createVector(
          this.left.x - oppositeBlockXDifference,
          this.left.y - oppositeBlockYDifference - this.height
        )
        .add(position),
      top: _P5
        .createVector(
          this.right.x - oppositeBlockXDifference,
          this.right.y - oppositeBlockYDifference - this.height
        )
        .add(position),
      right: _P5
        .createVector(
          this.right.x - oppositeBlockXDifference,
          this.right.y - oppositeBlockYDifference
        )
        .add(position),
      bottom: _P5
        .createVector(
          this.left.x - oppositeBlockXDifference,
          this.left.y - oppositeBlockYDifference
        )
        .add(position),
    };
  }

  private setRightQuad(position: Vector) {
    this.rightQuad = {
      left: _P5
        .createVector(this.left.x, this.left.y - this.height)
        .add(position),
      top: _P5
        .createVector(this.right.x, this.right.y - this.height)
        .add(position),
      right: _P5.createVector(this.right.x, this.right.y).add(position),
      bottom: _P5.createVector(this.left.x, this.left.y).add(position),
    };
  }

  private setBaseQuad() {
    this.baseQuad = {
      left: this.rightQuad.left,
      top: this.leftQuad.left,
      right: this.leftQuad.bottom,
      bottom: this.rightQuad.bottom,
    };
  }

  private setTopQuad() {
    this.topQuad = {
      left: this.leftQuad.left,
      top: this.leftQuad.top,
      right: this.rightQuad.top,
      bottom: this.rightQuad.left,
    };
  }

  private setSideQuad() {
    this.sideQuad = {
      left: this.leftQuad.left,
      top: this.rightQuad.left,
      right: this.rightQuad.bottom,
      bottom: this.leftQuad.bottom,
    };
  }

  getCollisionBlock(): Quad {
    return this.baseQuad;
  }

  reposition(position: Vector): void {
    this.setLeftQuad(position);
    this.setRightQuad(position);
    this.setBaseQuad();
    this.setTopQuad();
    this.setSideQuad();
  }

  setOpacityColor(value: number): void {
    this.setFillColor([...this.fillColor, value]);
  }

  isQuadBehindWall(quad: Quad): boolean {
    return Collision.isQuadCollidingQuad(quad, this.leftQuad);
  }

  draw(basePosition: Vector): void {
    super.draw(basePosition);

    this.setStrokeColor(this.strokeColor);
    this.setFillColor(this.fillColor);

    this.setOpacityColor(255);

    Drawing.quad(this.baseQuad);
    Drawing.quad(this.leftQuad);
    Drawing.quad(this.rightQuad);
    Drawing.quad(this.topQuad);
    Drawing.quad(this.sideQuad);
  }
}

export default Wall;
