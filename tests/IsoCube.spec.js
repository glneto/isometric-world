import { IsoCube } from "../src/index";

describe("IsoCube", () => {
  test("correctly initializes", () => {
    const cube = new IsoCube({}, { x: 10, y: 20, height: 30, width: 40 });
    expect(cube.position.x).toBe(10);
    expect(cube.position.y).toBe(20);
    expect(cube.height).toBe(30);
    expect(cube.width).toBe(40);
  });

  test("correctly sets top and base quad", () => {
    const depth = 20,
      height = 30,
      width = 40,
      x = 10,
      y = 20,
      worldPosition = { x: 20, y: 30 };

    const cube = new IsoCube(worldPosition, x, y, height, width, { depth });

    // Cube center should be x30 y50
    expect(cube.topQuad.bottom).toEqual({ x: 30, y: 65 });
    expect(cube.topQuad.top).toEqual({ x: 30, y: 35 });
    expect(cube.topQuad.left).toEqual({ x: 10, y: 50 });
    expect(cube.topQuad.right).toEqual({ x: 50, y: 50 });

    expect(cube.baseQuad.bottom).toEqual({ x: 30, y: 65 + depth });
    expect(cube.baseQuad.top).toEqual({ x: 30, y: 35 + depth });
    expect(cube.baseQuad.left).toEqual({ x: 10, y: 50 + depth });
    expect(cube.baseQuad.right).toEqual({ x: 50, y: 50 + depth });
  });
});
