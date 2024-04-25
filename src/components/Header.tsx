import { Moon, SunDim } from "@phosphor-icons/react";
import styles from "../styles/header.module.css";
import { Dispatch, SetStateAction } from "react";

export const Header = ({
  lightMode,
  toggleLightmode,
}: {
  lightMode: boolean;
  toggleLightmode: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header
      className={`${styles.header} ${lightMode ? styles.headerLight : ""}`}
    >
      <div
        className={`${styles.toggle} ${lightMode ? styles.toggleLight : ""}`}
        onClick={() => toggleLightmode(!lightMode)}
      >
        {lightMode && <Moon weight="regular" size={22} />}
        {!lightMode && <SunDim weight="regular" size={22} />}
      </div>
      <div className={styles.wcButton}>
        <w3m-button />
      </div>
    </header>
  );
};
