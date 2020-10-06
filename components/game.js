import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
const fetch = require("node-fetch");

const io = require("socket.io-client");
const socket = io("http://localhost:8000");
console.log("connecting");

export default function Game() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);
  const [showPlaying, setShowPlaying] = useState(styles.hidden);
  const [players, setPlayers] = useState([]);
  const [id, setId] = useState("");
  const [guess, setGuess] = useState("");
  let playersArr = [players];

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.id !== undefined) {
      socket.on("connection", (socket) => {
        socket.join(id);
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
      router.push("/multiplayer", `/multiplayer?id=${id}`, { shallow: true });
      socket.emit("room", id);
      playersArr.push(username);
      setPlayers(playersArr);
      setId(id);
    } else {
      // joining existing server (player)
      socket.emit("room", router.query.id);
      setId(router.query.id);
      console.log(id, username);
      socket.emit("newuser", { room: router.query.id, username: username });
    }
  }

  socket.on("newuser", function (data) {
    console.log(data);
    var joined = players.concat(data);
    setPlayers(joined);
  });

  async function startGame() {
    const res = await fetch(`/api/getrandomstreetview`);
    const location = await res.json();
    router.push(
      `/multiplayer?lat=${location.lat}&lng=${location.long}`,
      `/multiplayer?lat=${location.lat}&lng=${location.long}`,
      {
        shallow: true,
      }
    );
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.hidden);
    setShowPlaying(styles.playing);
    socket.emit("newlocation", {
      room: id,
      lat: location.lat,
      lng: location.long,
    });
  }

  socket.on("newlocation", function ({ lat, lng }) {
    router.push(
      `/multiplayer?lat=${lat}&lng=${lng}`,
      `/multiplayer?lat=${lat}&lng=${lng}`,
      {
        shallow: true,
      }
    );
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.hidden);
    setShowPlaying(styles.playing);
  });

  function changeGuess(event) {
    setGuess(event.target.value);
  }

  function sendGuess() {
    fetch("/api/finddistance", {
      method: "post",
      body: JSON.stringify({
        guessedplace: guess,
        lat: router.query.lat,
        long: router.query.lng,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((body) => {
        const distance = JSON.parse(body).distance;
        console.log(distance);
        socket.emit("guesslocation", {
          room: id,

          username: username,

          distance: distance,
        });
      });
  }

  socket.on("results", function ({ username, distance }) {
    console.log(username, distance);
  });

  return (
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
            value={guess}
            onChange={changeGuess}
          ></input>
          <button onClick={sendGuess}>guess</button>
        </div>
      </div>
    </div>
  );
}
