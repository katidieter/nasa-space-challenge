const axios = require('axios');

function getDisasters() {
  return axios.get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events").then(resp => {
    return resp.data.events;
  });
}

function getDisastersByCoordinates(latitude, longitude) {
  
}

getDisasters().then((a) => console.log(a));