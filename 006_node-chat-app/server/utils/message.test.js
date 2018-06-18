const expect = require('expect');
const Chance = require('chance');
const { pick } = require('lodash');

const { generateMessage, generateLocationMessage } = require('./message.js');

const chance = new Chance();
const user = chance.name();
const text = chance.sentence();
const coords = chance.coordinates();

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

describe('Name of the group', () => {
  it('should generate correct location object', () => {
    const from = user;
    const [latitude, longitude] = coords.split(',').map(x => x.trim());
    const input = {
      latitude,
      longitude
    };
    const url = `https://www.google.com/maps?q=${input.latitude},${
      input.longitude
    }`;
    const actual = generateLocationMessage(
      from,
      input.latitude,
      input.longitude
    );
    expect(pick(actual, ['from', 'url'])).toMatchObject({ from, url });
    expect(actual.createdAt).toBeTruthy();
  });
});
