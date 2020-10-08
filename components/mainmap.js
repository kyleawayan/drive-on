import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
} from "react-google-maps";
// https://www.creative-tim.com/learning-lab/nextjs/react-google-maps/material-dashboard
const initialState = {
  miniMapChords: "",
};

export default function MainMap({ location }) {
  const router = useRouter();
  const [lat, setLat] = useState(38.044712);
  const [lng, setLng] = useState(-122.162265);

  useEffect(() => {
    if (router.query.lat !== undefined) {
      setLat(parseFloat(router.query.lat));
      setLng(parseFloat(router.query.lng));
    }
  });
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

  return (
    <MyMapComponent
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBb88IDIZNWC98UHnpvXrtZjYj8Y_dABKw"
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
