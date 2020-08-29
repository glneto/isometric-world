import IsoWorld, { _P5 } from "../../../../src/index";
import { initialize } from "../../setup";

let world: IsoWorld;

const onSetup = () => {
  world = new IsoWorld(0, 0, 10, 80, 120);
};

const onDraw = () => {
  world.draw();
};

initialize({ onDraw, onSetup });
