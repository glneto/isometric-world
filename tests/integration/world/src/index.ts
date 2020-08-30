import IsoWorld, { _P5, IsoLayer } from "../../../../src/index";
import { initialize } from "../../p5Setup";
import IsoCubeMap from "../../../../src/IsoCubeMap";
import DocumentUtils from "../../../../src/utils/documentUtils";

let world: IsoWorld;

const onSetup = () => {
  world = new IsoWorld({
    x: _P5.windowWidth / 2,
    y: 5
  });

  const map = new IsoCubeMap({
    cubeHeight: 80,
    cubeWidth: 120,
    format: DocumentUtils.locationSearchToObject().format,
    position: world.startPosition
  });

  const layer = new IsoLayer([map]);
  world.addLayer(layer);
};

const onDraw = () => {
  world.draw();
};

initialize({ onDraw, onSetup });
