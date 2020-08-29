import Quad from "../interfaces/Quad";
import { _P5 } from "../IsoP5";
import { Vector } from "p5";

const cloneAndMoveQuad = (quad: Quad, delta: Vector): Quad => {
  return {
    top: _P5.createVector(quad.top.x + delta.x, quad.top.y + delta.y),
    bottom: _P5.createVector(quad.bottom.x + delta.x, quad.bottom.y + delta.y),
    right: _P5.createVector(quad.right.x + delta.x, quad.right.y + delta.y),
    left: _P5.createVector(quad.left.x + delta.x, quad.left.y + delta.y)
  };
};

const QuadUtils = {
  cloneAndMoveQuad
};

export default QuadUtils;
