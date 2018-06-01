const request = require('request');

const getWeather = (lat, lng, callback) => {
  request(
    {
      uri: `https://api.darksky.net/forecast/${
        process.env.DARK_SKY_API_KEY
      }/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { temperature, apparentTemperature } = body.currently;
        callback(undefined, { temperature, apparentTemperature });
      } else {
        callback('Unable to fetch weather.');
      }
    }
  );
};

module.exports = { getWeather };
