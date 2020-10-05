import styles from "../styles/game.module.css";

export default function Game({ children }) {
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        <h1>Where is it?</h1>
        <input className={styles.form}></input>
      </div>
    </div>
  );
}
