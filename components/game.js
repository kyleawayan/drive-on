import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../components/bruh";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
const fetch = require("node-fetch");
import MiniMap from "../components/minimap";

const io = require("socket.io-client");
// const socket = io("https://driveonserver.kylan.io", {
//   transport: ["websocket"],
// });
 const socket = io("localhost:8000", {
   transport: ["websocket"],
 });
console.log("connecting game");

export default function Game({lat, long}) {
  console.log("rerender");;
  const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };
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
 // const [lat, setLat] = useState(38.044712);
  const [markerLat, setMarkerLat] = useState(38.044712);
  const [markerLong, setMarkerLong] = useState(-122.162265);
  // const [lng, setLng] = useState(-122.162265);
  guessRef.current = guess;
  const [guessesIn, setGuessesIn] = useState(0);
  let playersArr = [players];



  const defaultCenter = {
    lat: lat + (Math.random() < 0.5 ? -1 : 1) / 3,
    lng: long + (Math.random() < 0.5 ? -1 : 1) / 3,
  };

  useEffect(() => {
    if (router.query.id !== undefined) {
      console.log(`connecting to ${router.query.id}`);
      socket.on("connection", (socket) => {
        socket.join(router.query.id);
      });
    }
  }, []);

  function setUser(event) {
    setUsername(event.target.value);
  }

  function putUsername() {
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.lobby);
    if (router.query.id == undefined) {
      // new game (host)
      var id = nanoid(5);
      router.push(`/multiplayer?id=${id}`, `/multiplayer?id=${id}`, {
        shallow: true,
      });
      socket.emit("room", id);
      playersArr.push(username);
      setPlayers(playersArr);
      setId(id);
    } else {
      // joining existing server (player)
      socket.emit("room", router.query.id);
      setId(router.query.id);
      socket.emit("newuser", { room: router.query.id, username: username });
    }
  }

  socket.on("newuser", function (data) {
    var joined = players.concat(data);
    setPlayers(joined);
  });

  async function startGame() {
    setResults({});
    // socket.emit("startnewlocation", id);
    const res = await fetch(`/api/getrandomstreetview`);
    const location = await res.json();
    // router.push(
    //   `/multiplayer?lat=${location.lat}&lng=${location.long}&id=${id}`,
    //   `/multiplayer?lat=${location.lat}&lng=${location.long}&id=${id}`,
    //   {
    //     shallow: true,
    //   }
    // );
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.hidden);
    setShowPlaying(styles.playing);
    socket.emit("newlocation", {
      room: id,
      lat: location.lat,
      lng: location.long,
    });
  }

  // socket.on("startnewlocation", function (data) {
  //   setResults({});
  //   setHideMakeLobby(styles.hidden);
  //   setShowLobby(styles.hidden);
  //   setShowPlaying(styles.playing);
  // });



  function changeGuess(event) {
    setGuess(event.target.value);
  }

  function sendGuess() {
    fetch("/api/finddistance", {
      method: "post",
      body: JSON.stringify({
        guessedplace: state.miniMapChords,
        lat: lat,
        long: long,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((body) => {
        const distance = JSON.parse(body);
        socket.emit("guesslocation", {
          room: id,

          username: username,

          distance: distance.distance,

          guess: distance.guess,
        });
        // var key = `${username}: ${distance.guess}`;
        var newResult = { [username]: distance.distance };
        var newResults = Object.assign({}, results, newResult);
        setResults(newResults);
      });
  }

  socket.on("results", function ({ username, distance, typedguess }) {
    // var key = `${username}: ${typedguess}`;
    var newResult = { [username]: distance };
    var newResults = Object.assign({}, results, newResult);
    setResults(newResults);
  });

  const mapCoordinates = React.useContext(MiniMap);

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.text}>
          <div className={hideMakeLobby}>
            <h1>Username</h1>
            <input
              className={styles.form}
              value={username}
              onChange={setUser}
            ></input>
            <button onClick={putUsername}>make lobby</button>
          </div>
          <div className={showLobby}>
            <h1>Lobby</h1>
            <ol>
              {players.map((players) => (
                <li>{players}</li>
              ))}
            </ol>
            <button onClick={startGame}>start</button>
          </div>
          <div className={showPlaying}>
            <h1>Where is it</h1>
            <input
              className={styles.form}
              value={state.miniMapChords}
              onChange={changeGuess}
            ></input>
            <button onClick={sendGuess}>guess</button>
            <button onClick={startGame}>another location</button>
            <br></br>
            <br></br>
            <div className={styles.score}>
              {Object.entries(results).map(([key, value]) => {
                return (
                  <div>
                    {key}
                    <h1>{value}mi</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
