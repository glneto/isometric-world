import { generateCubeMatrix } from "../src/IsoWorld";

describe("IsoWorld", () => {
  describe("generateCubeMatrix", () => {
    test("correctly generates first three matrix lines", () => {
      const squares = 30;
      const squareHeight = 50;
      const squareWidth = 50;
      const world = {};
      const matrix = generateCubeMatrix(world, squares, squareHeight, squareWidth);

      const halfHeight = squareHeight / 2;
      const halfWidth = squareWidth / 2;
      const topCoordinate = -((squareHeight * squares) / 2) + halfHeight;

      // First row
      expect(matrix.getCube(0, 0).position.x).toBe(0);
      expect(matrix.getCube(0, 0).position.y).toBe(topCoordinate);

      // Second row
      expect(matrix.getCube(1, 0).position.x).toBe(-halfWidth);
      expect(matrix.getCube(1, 0).position.y).toBe(topCoordinate + halfHeight);

      expect(matrix.getCube(0, 1).position.x).toBe(halfWidth);
      expect(matrix.getCube(0, 1).position.y).toBe(topCoordinate + halfHeight);

      // Third row
      expect(matrix.getCube(2, 0).position.x).toBe(-halfWidth - halfWidth);
      expect(matrix.getCube(2, 0).position.y).toBe(topCoordinate + halfHeight + halfHeight);

      expect(matrix.getCube(0, 2).position.x).toBe(halfWidth + halfWidth);
      expect(matrix.getCube(0, 2).position.y).toBe(topCoordinate + halfHeight + halfHeight);

      expect(matrix.getCube(1, 1).position.x).toBe(0);
      expect(matrix.getCube(1, 1).position.y).toBe(topCoordinate + halfHeight + halfHeight);
    });

    test("correctly generates bottom matrix lines", () => {
      const worldPosition = { x: 0, y: 0 };
      const squares = 5;
      const squareHeight = 50;
      const squareWidth = 50;
      const matrix = generateCubeMatrix(worldPosition, squares, squareHeight, squareWidth);

      expect(matrix.getCube(2, 2).position.x).toBe(0);
      expect(matrix.getCube(2, 2).position.y).toBe(0);

      expect(matrix.getCube(4, 4).position.x).toBe(0);
    });
  });
});
