import IsoWorld from "../src/IsoWorld";
import { _P5 } from "../src/IsoP5";

describe("IsoWorld", () => {
  describe("generateCubeMatrix", () => {
    test("correctly generates matrix lines", () => {
      const world = new IsoWorld({
        x: _P5.width / 2,
        y: _P5.height / 2,
        cubes: 5,
        cubeHeight: 80,
        cubeWidth: 120
      });

      const matrix = generateCubeMatrix(world);
      expect(matrix.getCube(0, 0).position.x).toBe(0);
      expect(matrix.getCube(0, 0).position.y).toBe(-(world.cubeHeight * 4));

      expect(matrix.getCube(1, 0).position.x).toBe(-(world.cubeWidth / 2));
      expect(matrix.getCube(0, 1).position.x).toBe(world.cubeWidth / 2);
      expect(matrix.getCube(0, 0).position.x).toBe(0);

      expect(matrix.getCube(2, 0).position.x).toBe(-world.cubeWidth);
      expect(matrix.getCube(0, 2).position.x).toBe(world.cubeWidth);
      expect(matrix.getCube(1, 1).position.x).toBe(0);
    });
  });
});
