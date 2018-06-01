const request = require('request');

const gecodeAddress = (address, callback) => {
  const addressQuery = encodeURIComponent(address);
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${
        process.env.GEOCODE_API_KEY
      }`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        const results = body.results[0];
        const { formatted_address } = results;
        const { lat, lng } = results.geometry.location;
        callback(undefined, {
          address: formatted_address,
          latitude: lat,
          longitude: lng
        });
      }
    }
  );
};

module.exports = { gecodeAddress };
