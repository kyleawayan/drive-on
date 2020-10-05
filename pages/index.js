import styles from "../styles/Home.module.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  OverlayView,
} from "react-google-maps";
// https://www.creative-tim.com/learning-lab/nextjs/react-google-maps/material-dashboard

export default function Home() {
  const defaultCenter = { lat: 40.748817, lng: -73.985428 };

  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={8} defaultCenter={defaultCenter}>
        <StreetViewPanorama
          defaultPosition={defaultCenter}
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
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA958bNtc12uKxbXIUI1dTLWR44XnXxMw"
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
