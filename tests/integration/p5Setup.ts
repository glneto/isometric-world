import { setP5, _P5 } from "../../src/index";
import * as p5 from "../../p5.min.js";
import DocumentUtils from "../../src/utils/documentUtils";

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
  const params = DocumentUtils.locationSearchToObject();

  const setup = () => {
    _P5.frameRate(40);
    _P5.createCanvas(
      params.canvasWidth || _P5.windowWidth,
      params.canvasHeight || _P5.windowHeight
    );

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
