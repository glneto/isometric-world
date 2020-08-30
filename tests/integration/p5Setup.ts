import { setP5, _P5 } from "../../src/index";
import * as p5 from "../../p5.min.js";

interface InitializeParams {
  onDraw?: Function;
  onKeyPressed?: Function;
  onPreload?: Function;
  onSetup?: Function;
}

export const initialize = ({
  onSetup,
  onDraw,
  onPreload,
  onKeyPressed
}: InitializeParams = {}) => {
  const setup = () => {
    _P5.frameRate(40);
    _P5.createCanvas(_P5.windowWidth, _P5.windowHeight);

    if (onSetup) onSetup();
  };

  let s = (sk: any) => {
    sk.setup = setup;
    sk.preload = onPreload;
    sk.keyPressed = onKeyPressed;
    sk.draw = onDraw;
  };

  setP5(new p5(s));
};
