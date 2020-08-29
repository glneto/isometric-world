import Algebra from "./algebra";
import Quad from "../interfaces/Quad";
import { Vector } from "p5";

const isPointCollidingQuad = (px: number, py: number, quad: Quad): boolean => {
  px = Math.floor(px);
  py = Math.floor(py);

  const x1 = Math.floor(quad.left.x);
  const y1 = Math.floor(quad.left.y);

  const x2 = Math.floor(quad.top.x);
  const y2 = Math.floor(quad.top.y);

  const x3 = Math.floor(quad.right.x);
  const y3 = Math.floor(quad.right.y);

  const x4 = Math.floor(quad.bottom.x);
  const y4 = Math.floor(quad.bottom.y);

  const maxY = Math.max(y1, y2, y3, y4);
  const minY = Math.min(y1, y2, y3, y4);
  const maxX = Math.max(x1, x2, x3, x4);
  const minX = Math.min(x1, x2, x3, x4);

  const leftDeterminant = Algebra.SarrusDeterminant(x1, y1, x2, y2, px, py);
  const topDeterminant = Algebra.SarrusDeterminant(x2, y2, x3, y3, px, py);
  const rightDeterminant = Algebra.SarrusDeterminant(x4, y4, x3, y3, px, py);
  const bottomDeterminant = Algebra.SarrusDeterminant(x1, y1, x4, y4, px, py);

  // Check if the point is above/below the limiting lines.
  if (px >= minX && px <= maxX && py >= minY && py <= maxY) {
    return (
      topDeterminant >= 0 &&
      bottomDeterminant <= 0 &&
      leftDeterminant >= 0 &&
      rightDeterminant <= 0
    );
  }

  return false;
};

const isQuadCollidingQuad = (quad1: Quad, quad2: Quad): boolean => {
  return [
    quad1.bottom,
    quad1.left,
    quad1.right,
    quad1.top,
  ].some((vertice: Vector) =>
    isPointCollidingQuad(vertice.x, vertice.y, quad2)
  );
};

const isQuadContainingQuad = (quad1: Quad, quad2: Quad): boolean => {
  return [
    quad1.bottom,
    quad1.left,
    quad1.right,
    quad1.top,
  ].every((vertice: Vector) =>
    isPointCollidingQuad(vertice.x, vertice.y, quad2)
  );
};

const Collision = {
  isPointCollidingQuad,
  isQuadCollidingQuad,
  isQuadContainingQuad,
};

export default Collision;
