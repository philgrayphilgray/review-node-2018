const yargs = require('yargs');
require('dotenv').config();

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.gecodeAddress(address, (errorMessage, results) => {
  if (errorMessage) {
    console.error(errorMessage);
  } else {
    console.log(results.address);
    const { lat, lng } = results;
    weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.error(errorMessage);
      } else {
        console.log(
          `It's currently ${weatherResults.temperature}. But it feels like ${
            weatherResults.apparentTemperature
          }`
        );
      }
    });
  }
});
