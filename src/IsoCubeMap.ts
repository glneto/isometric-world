import IsoCube from "./IsoCube";

class IsoCubeMap extends Map<string, IsoCube> {
  constructor() {
    super();
  }

  setCube(x: number, y: number, cube: IsoCube): Map<string, IsoCube> {
    return super.set(`x${x}y${y}`, cube);
  }

  getCube(x: number, y: number): IsoCube {
    return super.get(`x${x}y${y}`);
  }
}

export default IsoCubeMap;
