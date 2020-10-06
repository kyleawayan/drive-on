import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

const io = require("socket.io-client");
const socket = io("http://localhost:8000");
console.log("connecting");

export default function Game() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);
  const [players, setPlayers] = useState([]);
  let playersArr = [players];

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.id !== undefined) {
      socket.on("connection", (socket) => {
        socket.join(id);
      });
    }
    return () => socket.disconnect();
  }, []);

  function setUser(event) {
    setUsername(event.target.value);
  }

  var id = "";

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
    } else {
      // joining existing server (player)
      socket.emit("room", router.query.id);
      console.log(id, username)
      socket.emit("newuser", {   room: router.query.id , username: username   });
    }
  }

  socket.on("newuser", function (data) {
    console.log(data);
    var joined = players.concat(data);
    setPlayers(joined);
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
          <h1>loby</h1>
          <ol>
            {players.map((players) => (
              <li>{players}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
