import styles from "../styles/notConnected.module.css";

export const NotConnected = ({ lightMode }: { lightMode: boolean }) => {
  return (
    <div
      className={`${styles.NotConnected} ${
        lightMode ? styles.NotConnectedLight : ""
      }`}
    >
      <p>Please connect your wallet to get started! 🚀</p>
    </div>
  );
};
