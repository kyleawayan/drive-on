import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { AppContext } from "../components/bruh";
import { useRouter } from "next/router";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default function MiniMap() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const [lat, setLat] = useState(38.044712);
  const [markerLat, setMarkerLat] = useState(38.044712);
  const [markerLong, setMarkerLong] = useState(-122.162265);
  const [lng, setLng] = useState(-122.162265);
  const [zoom, setZoom] = useState(4);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  useEffect(() => {
    if (router.query.lat !== undefined) {
      setLat(parseFloat(router.query.lat) + (Math.random() < 0.5 ? -1 : 1) / 3);
      setLng(parseFloat(router.query.lng) + (Math.random() < 0.5 ? -1 : 1) / 3);
    }
  });

  function makeMarker(newMark) {
    // setGuess(`${newMark.latLng.lat()} ${newMark.latLng.lng()}`);
    setMarkerLat(newMark.latLng.lat());
    // setLat(newMark.latLng.lat());
    setMarkerLong(newMark.latLng.lng());
    // setLng(newMark.latLng.lng());
    changeInputValue(`${newMark.latLng.lat()}, ${newMark.latLng.lng()}`);
  }

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
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBb88IDIZNWC98UHnpvXrtZjYj8Y_dABKw"
          loadingElement={<div style={loadingElementStyle2} />}
          containerElement={<div style={containerElementStyle2} />}
          mapElement={<div style={mapElementStyle2} />}
        />
      </div>
    </div>
  );
}
