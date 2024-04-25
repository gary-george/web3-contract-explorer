import { Dispatch, SetStateAction } from "react";
import { TXHistoryType, UserDataType, defaultUserData } from "./Connected";
import styles from "../styles/connected.module.css";
import { MyEtherscanProvider } from "../helpers/getTXHistory";

const Item = ({
  theKey,
  value,
  lightMode,
}: {
  theKey: string;
  value: string;
  lightMode: boolean;
}) => {
  return (
    <div className={`${styles.item} ${lightMode ? styles.itemLight : ""}`}>
      <div className={styles.key}>
        {theKey} {" :"}
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export const AddressInfo = ({
  lightMode,
  userData,
  setUserData,
  contractAddress,
  setContractAddress,
  setTXHistory,
  setLoading,
}: {
  lightMode: boolean;
  userData: UserDataType;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
  contractAddress: string;
  setContractAddress: Dispatch<SetStateAction<string>>;
  setTXHistory: Dispatch<SetStateAction<TXHistoryType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className={styles.userData}>
        <Item theKey="Name" value={userData.name} lightMode={lightMode} />
        <Item theKey="Symbol" value={userData.symbol} lightMode={lightMode} />
        <Item
          theKey="Total Supply"
          value={userData.totalSupply}
          lightMode={lightMode}
        />
        <Item
          theKey="Your Balance"
          value={userData.userBalance}
          lightMode={lightMode}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button} ${lightMode ? styles.buttonLight : ""}`}
          onClick={() => {
            setContractAddress("");
            setUserData(defaultUserData);
          }}
        >
          Reset
        </button>
        <button
          className={`${styles.button} ${lightMode ? styles.buttonLight : ""}`}
          onClick={async () => {
            const myEtherScanInstance = new MyEtherscanProvider();
            setLoading(true);
            const res = await myEtherScanInstance.getHistory(contractAddress);
            const latestTx = res.slice(0, 10);

            setTXHistory(latestTx);
            setUserData({
              ...userData,
              mode: "txHistory",
            });

            setLoading(false);
          }}
        >
          Transactions
        </button>
      </div>
    </>
  );
};
