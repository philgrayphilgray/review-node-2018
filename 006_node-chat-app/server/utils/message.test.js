const expect = require('expect');
const Chance = require('chance');
const { pick } = require('lodash');

const { generateMessage } = require('./message.js');

const chance = new Chance();
const user = chance.name();
const text = chance.sentence();

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const input = {
      from: user,
      text
    };
    const actual = generateMessage(input.from, input.text);
    expect(pick(actual, ['from', 'text'])).toMatchObject(input);
    expect(actual.createdAt).toBeTruthy();
  });
});
