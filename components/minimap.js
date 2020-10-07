import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
const fetch = require("node-fetch");
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  Marker,
} from "react-google-maps";

export default function MiniMap() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);
  const [showPlaying, setShowPlaying] = useState(styles.hidden);
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  const [id, setId] = useState("");
  const [guess, setGuess] = useState("");
  const guessRef = useRef(guess);
  const [lat, setLat] = useState(38.044712);
  const [markerLat, setMarkerLat] = useState(38.044712);
  const [markerLong, setMarkerLong] = useState(-122.162265);
  const [lng, setLng] = useState(-122.162265);
  guessRef.current = guess;
  const [guessesIn, setGuessesIn] = useState(0);
  let playersArr = [players];

  console.log(lat, lng);
  const defaultCenter = {
    lat: lat + (Math.random() < 0.5 ? -1 : 1) / 3,
    lng: lng + (Math.random() < 0.5 ? -1 : 1) / 3,
  };

  function makeMarker(newMark) {
    console.log(`${newMark.latLng.lat()}, ${newMark.latLng.lng()}`);
    setGuess(`${newMark.latLng.lat()} ${newMark.latLng.lng()}`);
  }

  const MiniMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={defaultCenter}
        onClick={makeMarker}
      >
        <Marker position={{ lat: markerLat, lng: markerLong }} />
      </GoogleMap>
    ))
  );

  const loadingElementStyle2 = { height: "100%" };
  const containerElementStyle2 = { height: `100%` };
  const mapElementStyle2 = { height: "100%" };

  return (
    <div className="minimap">
      <MiniMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKwlZBFyOTmWNeW-ebwEfOrZR41yqmxmM"
        loadingElement={<div style={loadingElementStyle2} />}
        containerElement={<div style={containerElementStyle2} />}
        mapElement={<div style={mapElementStyle2} />}
      />
    </div>
  );
}
