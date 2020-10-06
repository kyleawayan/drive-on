import { useState, useEffect, useRef } from "react";
import styles from "../styles/game.module.css";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

const io = require("socket.io-client");
const socket = io("http://localhost:8000");

export default function Game() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [hideMakeLobby, setHideMakeLobby] = useState(styles.makelobby);
  const [showLobby, setShowLobby] = useState(styles.hidden);

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

  function putUsername() {
    setHideMakeLobby(styles.hidden);
    setShowLobby(styles.lobby);
    if (router.query.id !== undefined) {
        const id = nanoid(5);
        router.push("/multiplayer", `/multiplayer?id=${id}`, { shallow: true });
        socket.on("connection", (socket) => {
          socket.join(id);
        });
      }
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
          <h1>loby</h1>
        </div>
      </div>
    </div>
  );
}
