import { useState, useEffect, useRef, useCallback, useContext} from "react";
import { AppContext } from "../components/bruh";
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
  const {state, dispatch} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);
  const [showPlaying, setShowPlaying] = useState(styles.hidden);
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  const [id, setId] = useState("");
  const [guessedCoordinates, setGuessedCoordinates] = useState("");
  const [lat, setLat] = useState(38.044712);
  const [markerLat, setMarkerLat] = useState(38.044712);
  const [markerLong, setMarkerLong] = useState(-122.162265);
  const [lng, setLng] = useState(-122.162265);
  const [guessesIn, setGuessesIn] = useState(0);
  const [zoom, setZoom] = useState(4);
  let playersArr = [players];

  const changeInputValue = (newValue) => {

    dispatch({ type: 'UPDATE_INPUT', data: newValue,});
};

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.lat !== undefined) {
      setLat(parseFloat(router.query.lat) + (Math.random() < 0.5 ? -1 : 1) / 3);
      setLng(parseFloat(router.query.lng) + (Math.random() < 0.5 ? -1 : 1) / 3);
      console.log(router.query.lat, router.query.lng);
    }
  });



  function makeMarker(newMark) {
    console.log(`${newMark.latLng.lat()}, ${newMark.latLng.lng()}`);
    // setGuess(`${newMark.latLng.lat()} ${newMark.latLng.lng()}`);
    setMarkerLat(newMark.latLng.lat());
    // setLat(newMark.latLng.lat());
    setMarkerLong(newMark.latLng.lng());
    // setLng(newMark.latLng.lng());
    changeInputValue(`${newMark.latLng.lat()}, ${newMark.latLng.lng()}`)
  }

  console.log(lat, lng);
  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  const MiniMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={zoom}
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
    <div>
      <div className="minimap">
        <MiniMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA958bNtc12uKxbXIUI1dTLWR44XnXxMw"
          loadingElement={<div style={loadingElementStyle2} />}
          containerElement={<div style={containerElementStyle2} />}
          mapElement={<div style={mapElementStyle2} />}
        />
      </div>
    </div>
  );
}
