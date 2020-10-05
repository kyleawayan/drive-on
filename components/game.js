import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";

const io = require("socket.io-client");
const socket = io("http://localhost:8000");

export default function Game() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  function setUser(event) {
    setUsername(event.target.value);
  }

  function putUsername() {
    console.log(username);
    socket.emit("event", username);
  }

  return (
    <div className={styles.box}>
      <div className={styles.text}>
        <h1>Username</h1>
        <input
          className={styles.form}
          value={username}
          onChange={setUser}
        ></input>
        <button onClick={putUsername}>play</button>
      </div>
    </div>
  );
}
