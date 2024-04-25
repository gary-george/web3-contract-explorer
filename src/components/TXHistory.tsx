import { Dispatch, SetStateAction, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { TXHistoryType, UserDataType } from "./Connected";
import styles from "../styles/connected.module.css";

const TxItem = ({
  theKey,
  value,
  lightMode,
}: {
  theKey: string;
  value: string;
  lightMode: boolean;
}) => (
  <div
    className={`${styles.txHistoryItem} ${
      lightMode ? styles.txHistoryItemLight : ""
    }`}
  >
    <div className={styles.txHistoryItemKey}>{theKey}</div>
    <div className={styles.txHistoryItemValue}>{value}</div>
  </div>
);

const LatestTransactions = ({
  txHistory,
  lightMode,
}: {
  txHistory: TXHistoryType[];
  lightMode: boolean;
}) => {
  const [currentTx, updateTx] = useState(0);

  return (
    <div
      className={`${styles.txHistory} ${
        lightMode ? styles.txHistoryLight : ""
      }`}
    >
      <TxItem
        theKey="Block Number"
        value={txHistory[currentTx].blockNumber}
        lightMode={lightMode}
      />
      <TxItem
        theKey="From"
        value={txHistory[currentTx].from}
        lightMode={lightMode}
      />
      <TxItem
        theKey="To"
        value={txHistory[currentTx].to}
        lightMode={lightMode}
      />
      <TxItem
        theKey="Gas"
        value={txHistory[currentTx].gas}
        lightMode={lightMode}
      />
      <TxItem
        theKey="Function Name"
        value={txHistory[currentTx].functionName}
        lightMode={lightMode}
      />

      <div className={styles.txHistoryButtons}>
        <button
          className={`${styles.txHistoryButton} ${
            currentTx === 0 ? styles.disabled : ""
          } ${lightMode ? styles.txHistoryButtonLight : ""}`}
          onClick={() => {
            if (currentTx > 0) {
              updateTx(currentTx - 1);
            }
          }}
        >
          <CaretLeft size={24} weight="regular" />
        </button>
        {currentTx + 1} / {txHistory.length}
        <button
          className={`${styles.txHistoryButton} ${
            currentTx === txHistory.length - 1 ? styles.disabled : ""
          } ${lightMode ? styles.txHistoryButtonLight : ""}`}
          onClick={() => {
            if (currentTx < txHistory.length - 1) {
              updateTx(currentTx + 1);
            }
          }}
        >
          <CaretRight size={24} weight="regular" />
        </button>
      </div>
    </div>
  );
};

export const TXHistory = ({
  lightMode,
  setUserData,
  userData,
  txHistory,
}: {
  lightMode: boolean;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
  userData: UserDataType;
  txHistory: TXHistoryType[];
}) => {
  return (
    <div>
      <LatestTransactions txHistory={txHistory} lightMode={lightMode} />
      <div
        className={`${styles.buttonsContainer} ${styles.buttonsContainerSingle}`}
      >
        <button
          className={`${styles.button} ${lightMode ? styles.buttonLight : ""}`}
          onClick={() => {
            setUserData({ ...userData, mode: "info" });
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
