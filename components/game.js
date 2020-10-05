import { useEffect } from "react";
import styles from "../styles/game.module.css";


export default function Game({ children }) {
  var socket = require("socket.io-client")("http://localhost:8000");

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  function putUsername() {
    socket.emit("event", "hi");
  }

  return (
    <div className={styles.box}>
      <div className={styles.text}>
        <h1>Username</h1>
        <input className={styles.form}></input>
        <button onClick={putUsername}>play</button>
      </div>
    </div>
  );
}
