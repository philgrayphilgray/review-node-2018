const request = require('request');
const dotenv = require('dotenv').config();
const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    const addressQuery = encodeURIComponent(address);
    request(
      {
        uri: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${
          process.env.GEOCODE_API_KEY
        }`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find that address.');
        } else if (body.status === 'OK') {
          const results = body.results[0];
          const { formatted_address } = results;
          const { lat, lng } = results.geometry.location;
          resolve({
            address: formatted_address,
            lat,
            lng
          });
        }
      }
    );
  });
};

geocodeAddress('1600 Pennsylvania Ave Nw')
  .then(location => {
    console.log(JSON.stringify(location, undefined, 2));
  })
  .catch(error => console.log(error));
