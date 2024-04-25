import styles from "../styles/connected.module.css";
import { useState } from "react";
import { TXHistory } from "./TXHistory";
import { AddressInfo } from "./AddressInfo";
import { EnterAddress } from "./EnterAddress";
import { ToggleModalType } from "./CustomModal";
import { Spinner } from "./Spinner";
import { Eip1193Provider } from "ethers/providers";

export type UserDataType = {
  userBalance: string;
  totalSupply: string;
  name: string;
  symbol: string;
  retrieved: boolean;
  mode: "info" | "error" | "txHistory";
};

export type TXHistoryType = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddresstring: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export const defaultUserData: UserDataType = {
  userBalance: "0",
  totalSupply: "0",
  name: "",
  symbol: "",
  retrieved: false,
  mode: "info",
};

export const Connected = ({
  isConnected,
  address,
  walletProvider,
  lightMode,
  toggleModal,
}: {
  lightMode: boolean;
  isConnected: boolean;
  address: `0x${string}` | undefined;
  walletProvider: Eip1193Provider | undefined;
  toggleModal: ToggleModalType;
}) => {
  const [userData, setUserData] = useState<UserDataType>(defaultUserData);
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [txHistory, setTXHistory] = useState<TXHistoryType[]>([]);

  return (
    <div className={styles.connected}>
      {loading && <Spinner />}
      {userData.retrieved && userData.mode === "txHistory" && (
        <TXHistory
          lightMode={lightMode}
          setUserData={setUserData}
          userData={userData}
          txHistory={txHistory}
        />
      )}

      {userData.retrieved && userData.mode === "info" && (
        <AddressInfo
          userData={userData}
          lightMode={lightMode}
          setUserData={setUserData}
          setContractAddress={setContractAddress}
          contractAddress={contractAddress}
          setTXHistory={setTXHistory}
          setLoading={setLoading}
        />
      )}

      {!userData.retrieved && (
        <EnterAddress
          setUserData={setUserData}
          lightMode={lightMode}
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          isConnected={isConnected}
          walletProvider={walletProvider}
          address={address}
          toggleModal={toggleModal}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};
