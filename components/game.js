import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";

const io = require("socket.io-client");
const socket = io("http://localhost:8000");

export default function Game() {
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  function setUser(event) {
    setUsername(event.target.value);
  }

  function putUsername() {
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.lobby);
    const id = nanoid(5);
    // socket.on("connection", (socket) => {
    //   socket.join(id);
    // });
    socket.emit("event", username);
  }

  socket.on("event", function (data) {
    console.log(data);
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
        </div>
      </div>
    </div>
  );
}
