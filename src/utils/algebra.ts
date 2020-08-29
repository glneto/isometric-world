const SarrusDeterminant = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number
): number => {
  /**
   * line equation to get the line created by (x1,y1) / (x2, y2)
   * | x1 y1 1 | x1 y1
   * | x2 y2 1 | x2 y2
   * | px py 1 | px py
   */
  const mainAxis = x1 * y2 + y1 * x + x2 * y;
  const secondaryDiagonal = y2 * x + x1 * y + y1 * x2;
  return mainAxis - secondaryDiagonal;
};

const Algebra = {
  SarrusDeterminant
};

export default Algebra;
