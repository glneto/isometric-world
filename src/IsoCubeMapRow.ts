import IsoCubeMapColumn from "./IsoCubeMapColumn";
import { _P5 } from "./IsoP5";
import { Vector } from "p5";

interface IsoCubeMapRowProps {
  position: Vector;
  columnsLength: number;
  cubeWidth: number;
  cubeHeight: number;
}

class IsoCubeMapRow {
  private props: IsoCubeMapRowProps;
  columns: IsoCubeMapColumn[];

  constructor(props: IsoCubeMapRowProps) {
    this.props = props;
    this.columns = [];
    this.generateColumns();
  }

  private generateColumns(): void {
    const { position, cubeHeight, cubeWidth, columnsLength } = this.props;

    for (let columnIndex = 0; columnIndex < columnsLength; columnIndex++) {
      const x = position.x - (columnIndex * cubeWidth) / 2;
      const y = position.y + (columnIndex * cubeHeight) / 2;

      const columnPosition = _P5.createVector(x, y);

      this.columns.push(
        new IsoCubeMapColumn({
          position: columnPosition,
          cubeHeight: this.props.cubeHeight,
          cubeWidth: this.props.cubeWidth
        })
      );
    }
  }

  draw(basePosition: Vector): void {
    this.columns.forEach((column: IsoCubeMapColumn) => {
      column.draw(basePosition);
    });
  }
}

export default IsoCubeMapRow;
