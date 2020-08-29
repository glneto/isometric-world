import IsoCube from "./IsoCube";

class IsoCubeMap extends Map {
  constructor() {
    super();
  }

  setCube(x: number, y: number, cube: IsoCube) {
    return super.set(`x${x}y${y}`, cube);
  }

  getCube(x: number, y: number): IsoCube {
    return super.get(`x${x}y${y}`);
  }
}

export default IsoCubeMap;
