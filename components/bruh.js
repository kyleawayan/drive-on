import { useReducer, useState, useEffect } from "react";
export const AppContext = React.createContext();
import { useRouter } from "next/router";
import Game from "../components/game";
// https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
const initialState = {
  miniMapChords: "",
};

const io = require("socket.io-client");
// const socket = io("https://driveonserver.kylan.io", {
//   transport: ["websocket"],
// });
const socket = io("localhost:8000", {
  transport: ["websocket"],
});
console.log("connecting");

import MiniMap from "../components/minimap";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        miniMapChords: action.data,
      };

    default:
      return initialState;
  }
}

export default function Bruh({ location }) { 
const router = useRouter();
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lat, setLat] = useState(38.044712);
  const [lng, setLng] = useState(-122.162265);

  console.log("BRUH RERENDER");

  useEffect(() => {
    console.log(router.query);
    if (router.query.id !== undefined) {
      console.log(`connecting to ${router.query.id}`);
      socket.on("connection", (socket) => {
        socket.join(router.query.id);
      });
    }
  }, []);

  useEffect(() => {
    console.log(router.query);
    if (router.query.lat !== undefined) {
      console.log("got chords"); // this works!
      setLat(parseFloat(router.query.lat));
      setLng(parseFloat(router.query.lng));
    }
  });

  socket.on("newlocation", function ({ lat, lng }) {
    console.log("got new location");
    router.push(
      `/multiplayer?lat=${lat}&lng=${lng}&id=${id}`,
      `/multiplayer?lat=${lat}&lng=${lng}&id=${id}`,
      {
        shallow: true,
      }
    );
  });

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Game lat={lat} long={lng} />
        <MiniMap></MiniMap>
      </AppContext.Provider>
    </div>
  );
}
