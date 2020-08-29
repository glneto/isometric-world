import COMPASS from "../enum/compass";
import { Vector } from "p5";
import CompassDirection from "../enum/compass";

const getDirection = (p1: Vector, p2: Vector): COMPASS => {
  let direction = COMPASS.NORTH;

  // Check X axis
  if (p2.x > p1.x) {
    direction = COMPASS.EAST;
  } else if (p2.x < p1.x) {
    direction = COMPASS.WEST;
  }

  // In case the X delta is 0
  if (direction === COMPASS.NORTH && p2.y > p1.y) {
    direction = COMPASS.SOUTH;
  }
  // In case the X is going east, check if it's south east or north east (or none, in this case direction will remain east)
  else if (direction === COMPASS.EAST && p2.y > p1.y) {
    direction = COMPASS.SOUTHEAST;
  } else if (direction === COMPASS.EAST && p1.y > p2.y) {
    direction = COMPASS.NORTHEAST;
  }
  // In case the X is going west, check if it's south west or north west (or none, in this case direction will remain west)
  else if (direction === COMPASS.WEST && p2.y > p1.y) {
    direction = COMPASS.SOUTHWEST;
  } else if (direction === COMPASS.WEST && p1.y > p2.y) {
    direction = COMPASS.NORTHWEST;
  }

  return direction;
};

const isSouthDirection = (direction: CompassDirection): boolean =>
  [COMPASS.SOUTH, COMPASS.SOUTHEAST, COMPASS.SOUTHWEST].includes(direction);

const isNorthDirection = (direction: CompassDirection): boolean =>
  [COMPASS.NORTH, COMPASS.NORTHEAST, COMPASS.NORTHWEST].includes(direction);

const isWestDirection = (direction: CompassDirection): boolean =>
  [COMPASS.WEST, COMPASS.NORTHWEST, COMPASS.SOUTHWEST].includes(direction);

const isEastDirection = (direction: CompassDirection): boolean =>
  [COMPASS.EAST, COMPASS.NORTHEAST, COMPASS.SOUTHEAST].includes(direction);

const Compass = {
  getDirection,
  isSouthDirection,
  isNorthDirection,
  isWestDirection,
  isEastDirection,
};

export default Compass;
