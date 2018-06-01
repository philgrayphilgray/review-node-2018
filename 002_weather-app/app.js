const request = require('request');
const yargs = require('yargs');
require('dotenv').config();

const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

const { address } = argv;

const currentWeather = (lat, lng) => {
  request(
    {
      uri: `https://api.darksky.net/forecast/${
        process.env.DARK_SKY_API_KEY
      }/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { temperature } = body.currently;
        console.log(`Temperature: ${temperature}`);
      } else {
        console.log('Unable to fetch weather.');
      }
    }
  );
};

geocode.gecodeAddress(address, (errorMessage, results) => {
  if (errorMessage) {
    console.error(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    console.log(`The current weather:`);
    currentWeather(results.lat, results.lng);
  }
});
