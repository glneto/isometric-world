import IsoWorld, { _P5, IsoLayer } from "../../../../src/index";
import { initialize } from "../../p5Setup";
import IsoCubeMap from "../../../../src/IsoCubeMap";

let world: IsoWorld;

const onSetup = () => {
  world = new IsoWorld({
    x: _P5.width / 2,
    y: _P5.height / 2
  });

  const map = new IsoCubeMap({
    cubeHeight: 80,
    cubeWidth: 120,
    format: "5x5",
    position: world.startPosition
  });

  const layer = new IsoLayer([map]);
  world.addLayer(layer);
};

const onDraw = () => {
  world.draw();
};

initialize({ onDraw, onSetup });
