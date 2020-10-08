const fetch = require("node-fetch");
const { parseString } = require("xml2js");

export default (req, res) => {
  // res.end(JSON.stringify({ lat: 39.339414, long: -90.581311 }));
  var latt;
  var longt;

  async function getRandomChords() {
    await fetch("https://api.3geonames.org/?randomland=yes")
      .then((res) => res.text())
      .then((body) => {
        parseString(body, function (err, result) {
          latt = result.geodata.nearest[0].latt[0];
          longt = result.geodata.nearest[0].longt[0];
          checkIfStreetView();
        });
      });

    console.log(latt, longt);
  }
  getRandomChords();

  function checkIfStreetView() {
    fetch(
      `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latt},${longt}&key=AIzaSyA-2SUuUpop6l87nr2xXlqGPZiRMq0Sq3c`    )
      .then((res) => res.text())
      .then((body) => {
        console.log(body.length);
        if (body.length > 4978) {
          res.end(JSON.stringify({ lat: latt, long: longt }));
          return;
        } else {
          getRandomChords();
        }
      });
  }
};;;;;
