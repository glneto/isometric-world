import Quad from "../interfaces/Quad";
import { _P5 } from "../IsoP5";

const quad = (value: Quad) => {
  _P5.quad(
    value.left.x,
    value.left.y,
    value.top.x,
    value.top.y,
    value.right.x,
    value.right.y,
    value.bottom.x,
    value.bottom.y
  );
};

const Drawing = {
  quad,
};

export default Drawing;
