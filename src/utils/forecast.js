const request = require('request');

const key = '55de16cb8c18536173332c33cc2ecc92';

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=55de16cb8c18536173332c33cc2ecc92&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services.');
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
