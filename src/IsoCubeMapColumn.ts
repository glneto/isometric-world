import { Vector } from "p5";
import IsoCube from "./IsoCube";

interface IsoCubeMapColumnProps {
  position: Vector;
  cubeHeight: number;
  cubeWidth: number;
}

class IsoCubeMapColumn {
  private props: IsoCubeMapColumnProps;
  cube: IsoCube;

  constructor(props: IsoCubeMapColumnProps) {
    this.props = props;
    this.generateCube(this.props.position);
  }

  private generateCube(position: Vector): void {
    this.cube = new IsoCube({
      position,
      height: this.props.cubeHeight,
      width: this.props.cubeWidth
    });
  }

  draw(basePosition: Vector): void {
    this.cube.draw(basePosition);
  }
}

export default IsoCubeMapColumn;
