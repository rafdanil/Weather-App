const request = require('request');

const getMapBoxUrl = (city) => {
  const aCity = city.replace(/\s/g, '%20');

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${aCity}.json?access_token=pk.eyJ1IjoidGFmMTExIiwiYSI6ImNsNXVvbm1uaTAxcjEza2xjeHdneWRhNGUifQ.p0FfyF9h18ZpwXTeoS51cw&limit=1`;
};

const geocode = (address, callback) => {
  const url = getMapBoxUrl(address);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services.');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
