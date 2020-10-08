import { useReducer } from "react";
export const AppContext = React.createContext();
import Game from "../components/game";

// https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
const initialState = {
  miniMapChords: "",
};

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



export default function Bruh() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Game  />
        <MiniMap></MiniMap>
      </AppContext.Provider>
    </div>
  );
}
