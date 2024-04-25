import { getData } from "@/helpers/getData";
import styles from "../styles/connected.module.css";
import { Dispatch, SetStateAction } from "react";
import { Eip1193Provider } from "ethers/providers";
import { UserDataType } from "./Connected";
import { ToggleModalType } from "./CustomModal";
import { CurrencyEth, Info } from "@phosphor-icons/react";

function isValidEthereumAddress(address: string): address is `0x${string}` {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
}

export const EnterAddress = ({
  setUserData,
  lightMode,
  contractAddress,
  setContractAddress,
  isConnected,
  walletProvider,
  address,
  toggleModal,
  setLoading,
}: {
  setUserData: Dispatch<SetStateAction<UserDataType>>;
  lightMode: boolean;
  contractAddress: string;
  setContractAddress: Dispatch<SetStateAction<string>>;
  isConnected: boolean;
  address: `0x${string}` | undefined;
  walletProvider: Eip1193Provider | undefined;
  toggleModal: ToggleModalType;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <p
        className={`${styles.addressLabel}  ${
          lightMode ? styles.addressLabelLight : ""
        }`}
      >
        <CurrencyEth size={20} /> Ethereum Contract Explorer
      </p>
      <input
        className={styles.addressInput}
        type="text"
        placeholder="Enter contract address..."
        autoComplete="off"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <div
        className={`${styles.buttonsContainer} ${styles.buttonsContainerGetData} `}
      >
        <button
          className={`${styles.button} ${lightMode ? styles.buttonLight : ""}`}
          onClick={async () => {
            if (!isValidEthereumAddress(contractAddress)) {
              toggleModal({ open: true, type: "invalidAddress" });
              return;
            }
            setLoading(true);
            const data = await getData(
              isConnected,
              address,
              contractAddress,
              walletProvider
            );
            setLoading(false);
            setUserData({ ...data, retrieved: true, mode: "info" });
          }}
        >
          Get Data
        </button>
      </div>

      <div
        className={`${styles.exampleContainer} ${
          lightMode ? styles.exampleContainerLight : ""
        }`}
        onClick={() => toggleModal({ open: true, type: "exampleAddress" })}
      >
        <Info size={22} weight="fill" />
        <p className={styles.exampleAddresses}>view example addresses</p>
      </div>
    </div>
  );
};
