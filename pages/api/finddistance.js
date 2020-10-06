const NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");

const options = {
  provider: "google",
  apiKey: process.env.finddistancegooglekey, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

// const guessedPlace = "austraila";
// const lat = -34.29944;
// const long = 146.08443;

const geocoder = NodeGeocoder(options);

export default (req, res) => {
  console.log(req.body);
  async function getDistance() {
    const guess = await geocoder.geocode(req.body.guessedplace);
    console.log(guess);
    const distance = geolib.getDistance(
      { latitude: req.body.lat, longitude: req.body.long },
      {
        latitude: guess[0].latitude,
        longitude: guess[0].longitude,
      }
    );
    const distancemi = geolib.convertDistance(distance, "mi");
    console.log(distancemi);
    res.end(
      JSON.stringify({
        distance: distancemi,
        guess: req.body.guessedplace,
      })
    );
  }
  getDistance();
};
