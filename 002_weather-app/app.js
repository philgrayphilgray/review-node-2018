const request = require('request');
require('dotenv').config();

const addressQuery = '1600%20pennsylvania%20ave%20nw';

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
