const request = require('request');
const yargs = require('yargs');
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

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${
      process.env.GEOCODE_API_KEY
    }`,
    json: true
  },
  (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    const results = body.results[0];
    const { formatted_address } = results;
    const { lat, lng } = results.geometry.location;
    console.log(`Address: ${formatted_address}`);
    console.log(`Lat: ${lat}, Lng: ${lng}`);
  }
);
