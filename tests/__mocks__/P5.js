const MockVector = (x, y) => ({
  x,
  y
});

const MockP5 = {
  createVector: jest.fn((x, y) => MockVector(x, y))
};

export default MockP5;
