const request = require('request');
require('dotenv').config();

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=1600%20pennsylvania%20ave%20nw&key=${
      process.env.GEOCODE_API_KEY
    }`,
    json: true
  },
  (error, response, body) => {
    console.log(body);
  }
);
