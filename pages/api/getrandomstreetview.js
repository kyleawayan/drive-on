const fetch = require("node-fetch");
const { parseString } = require("xml2js");

export default (req, res) => {
  res.end(JSON.stringify({ lat: 38.044712, long: -122.162265 }));
  // var latt;
  // var longt;
  //
  // async function getRandomChords() {
  //   await fetch("https://api.3geonames.org/?randomland=yes")
  //     .then((res) => res.text())
  //     .then((body) => {
  //       parseString(body, function (err, result) {
  //         latt = result.geodata.nearest[0].latt[0];
  //         longt = result.geodata.nearest[0].longt[0];
  //         checkIfStreetView();
  //       });
  //     });
  //
  //   console.log(latt, longt);
  // }
  // getRandomChords();
  //
  // function checkIfStreetView() {
  //   fetch(
  //     `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latt},${longt}&key=AIzaSyDKwlZBFyOTmWNeW-ebwEfOrZR41yqmxmM`
  //   )
  //     .then((res) => res.text())
  //     .then((body) => {
  //       console.log(body.length);
  //       if (body.length > 4838) {
  //         res.end(JSON.stringify({ lat: latt, long: longt }));
  //         return;
  //       } else {
  //         getRandomChords();
  //       }
  //     });
  // }
};;;;
