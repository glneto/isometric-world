import IsoWorld from "../../../src/index";

export default (x, y) =>
  new IsoWorld(
    Position.getXCenter(),
    Position.getYCenter(),
    11,
    ISOMETRIC.SQUARE_HEIGHT,
    ISOMETRIC.SQUARE_WIDTH
  );
