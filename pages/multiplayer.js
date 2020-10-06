import absoluteUrl from "next-absolute-url";
const fetch = require("node-fetch");
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  OverlayView,
} from "react-google-maps";
// https://www.creative-tim.com/learning-lab/nextjs/react-google-maps/material-dashboard
import Game from "../components/game";

export default function Map({ location }) {
  const defaultCenter = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.long),
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
    <div>
      <Game />
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA958bNtc12uKxbXIUI1dTLWR44XnXxMw"
        loadingElement={<div style={loadingElementStyle} />}
        containerElement={<div style={containerElementStyle} />}
        mapElement={<div style={mapElementStyle} />}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/getrandomstreetview`);
  const location = await res.json();

  return { props: { location } };
}
