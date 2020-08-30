import IsoCube from "./IsoCube";
import { Vector } from "p5";
import { IIsoObject } from "./objects/IsoObject";
import { _P5 } from "./IsoP5";
import IsoCubeMapRow from "./IsoCubeMapRow";
import Quad from "./interfaces/Quad";

interface IsoCubeMapProps {
  position: Vector;
  format: string;
  cubeWidth: number;
  cubeHeight: number;
}

class IsoCubeMap implements IIsoObject {
  readonly props: IsoCubeMapProps;

  private rowsLength: number;
  private columnsLength: number;
  private rows: IsoCubeMapRow[];

  /**
   * Creates an IsoCubeMap.
   * @description
   * Condition: All cubes in the same map should have the same dimensions.
   */
  constructor(props: IsoCubeMapProps) {
    this.props = props;

    this.generateDimensions();
    this.generateRows();
  }

  private generateDimensions() {
    if (!/[0-9]+x[0-9]+/.test(this.props.format)) {
      throw new Error(
        "IsoCubeMap was initialized with an incorrect 'format' prop. Should use the pattern [number]x[number] (i.e.: 2x2, 3x3, 25x10, etc)"
      );
    }

    const dimensions: string[] = this.props.format.split("x");

    this.rowsLength = parseInt(dimensions[0]);
    this.columnsLength = parseInt(dimensions[1]);
    this.rows = [];
  }

  private generateRows(): void {
    const totalMapWidth = this.props.cubeWidth * this.columnsLength;
    const startX = totalMapWidth / 2;
    const startY = this.props.cubeHeight / 2;

    for (let row = 0; row < this.rowsLength; row++) {
      const x = startX + (row * this.props.cubeWidth) / 2;
      const y = startY + (row * this.props.cubeHeight) / 2;

      const position = _P5.createVector(x, y);

      this.rows.push(
        new IsoCubeMapRow({
          position,
          columnsLength: this.columnsLength,
          cubeHeight: this.props.cubeHeight,
          cubeWidth: this.props.cubeWidth
        })
      );
    }
  }

  getCube(row: number, column: number): IsoCube {
    return this.rows[row].columns[column].cube;
  }

  draw(basePosition: Vector): void {
    this.rows.forEach((row: IsoCubeMapRow) => {
      row.draw(basePosition);
    });
  }
}

export default IsoCubeMap;
