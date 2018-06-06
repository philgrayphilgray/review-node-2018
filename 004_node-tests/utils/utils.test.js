const utils = require('./utils');

it('should add two numbers', () => {
  const actual = utils.add(33, 11);
  const expected = 44;

  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got  ${actual}`);
  }
});

it('should square a number', () => {
  const actual = utils.sqaure(9);
  const expected = 81;

  if (actual !== expected) {
    throw new Error(`Expected ${expected} but got ${actual}`);
  }
});
