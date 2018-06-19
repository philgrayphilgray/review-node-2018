const expect = require('expect');
const Chance = require('chance');
const { isRealString } = require('./validation.js');

const chance = new Chance();

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = '';
    const actual = isRealString(str);
    expect(actual).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    const str = '  ';
    const actual = isRealString(str);
    expect(actual).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    const str = chance.string();
    const actual = isRealString(str);
    expect(actual).toBeTruthy();
  });
});
