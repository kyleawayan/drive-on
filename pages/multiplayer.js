import { useState, useEffect } from "react";
const fetch = require("node-fetch");
import { useRouter } from "next/router";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  Marker,
} from "react-google-maps";
// https://www.creative-tim.com/learning-lab/nextjs/react-google-maps/material-dashboard
import Game from "../components/game";
import MiniMap from "../components/minimap";

export default function Map({ location }) {
  const router = useRouter();

  const [lat, setLat] = useState(38.044712);
  const [lng, setLng] = useState(-122.162265);

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.lat !== undefined) {
      setLat(parseFloat(router.query.lat));
      setLng(parseFloat(router.query.lng));
      console.log(router.query.lat, router.query.lng);
    }
  });
  console.log(lat, lng);
  const defaultCenter = {
    lat: lat,
    lng: lng,
  };
  const options = {
    disableDefaultUI: true,
    enableCloseButton: false,
  };

  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={8} defaultCenter={defaultCenter}>
        <StreetViewPanorama
          defaultPosition={defaultCenter}
          options={options}
          visible
        ></StreetViewPanorama>
      </GoogleMap>
    ))
  );

  const loadingElementStyle = { height: "100%" };
  const containerElementStyle = { height: "100vh" };
  const mapElementStyle = { height: "100%" };

  const loadingElementStyle2 = { height: "100%" };
  const containerElementStyle2 = { height: `600px` };
  const mapElementStyle2 = { height: "50%" };

  return (
    <div>
      <Game />
      <MiniMap></MiniMap>
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKwlZBFyOTmWNeW-ebwEfOrZR41yqmxmM"
        loadingElement={<div style={loadingElementStyle} />}
        containerElement={<div style={containerElementStyle} />}
        mapElement={<div style={mapElementStyle} />}
      />
    </div>
  );
}