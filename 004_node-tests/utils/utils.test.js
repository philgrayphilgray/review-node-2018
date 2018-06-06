const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
  const actual = utils.add(33, 11);
  const expected = 44;

  // if (actual !== expected) {
  //   throw new Error(`Expected ${expected}, but got  ${actual}`);
  // }
  expect(actual)
    .toBe(expected)
    .toBeA('number');
});

it('should async add two numbers', done => {
  const expected = 7;
  utils.asyncAdd(4, 3, sum => {
    expect(sum).toBe(expected);
    done();
  });
});

it('should square a number', () => {
  const actual = utils.sqaure(9);
  const expected = 81;

  // if (actual !== expected) {
  //   throw new Error(`Expected ${expected} but got ${actual}`);
  // }
  expect(actual)
    .toBe(expected)
    .toBeA('number');
});

it('should async square a numbers', done => {
  const expected = 64;
  utils.asyncSquare(8, squared => {
    expect(squared).toBe(expected);
    done();
  });
});

it('should verify first and last names are the same', () => {
  const user = {};
  const fullName = 'Phil Gray';
  const actual = utils.setName(user, fullName);

  const expected = {
    firstName: 'Phil',
    lastName: 'Gray'
  };

  expect(actual.firstName).toBeA('string');
  expect(actual.lastName).toBeA('string');
  expect(actual.firstName.length).toBeGreaterThan(0);
  expect(actual.lastName.length).toBeGreaterThan(0);
  expect(actual).toInclude(expected);
});

it('should async set first and last name', async () => {
  const user = {};
  const fullName = 'Phil Gray';
  const expected = {
    firstName: 'Phil',
    lastName: 'Gray'
  };
  const actual = await utils.asyncSetName(user, fullName);
  expect(actual).toEqual(expected);
});
