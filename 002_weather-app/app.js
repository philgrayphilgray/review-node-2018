const yargs = require('yargs');
const axios = require('axios');

require('dotenv').config();

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
const addressQuery = encodeURIComponent(address);

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${
  process.env.GEOCODE_API_KEY
}`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    const results = response.data.results[0];
    const { lat, lng } = results.geometry.location;
    const { formatted_address } = results;
    console.log(formatted_address);
    const weatherUrl = `https://api.darksky.net/forecast/${
      process.env.DARK_SKY_API_KEY
    }/${lat},${lng}`;
    return axios.get(weatherUrl);
  })
  .then(response => {
    const { temperature, apparentTemperature } = response.data.currently;
    console.log(
      `It's currenlty ${temperature}. It feels like ${apparentTemperature}.`
    );
  })
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(error.message);
    }
  });
