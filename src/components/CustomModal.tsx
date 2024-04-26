import { Dispatch, SetStateAction, useState } from "react";
import { XCircle, Copy } from "@phosphor-icons/react";
import styles from "../styles/modal.module.css";

export type ToggleModalType = Dispatch<
  SetStateAction<{
    open: boolean;
    type: string;
  }>
>;

const copyAddress = async (
  add: string,
  setCopied: Dispatch<SetStateAction<boolean>>
) => {
  await navigator.clipboard.writeText(add);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

const CopyToClipboard = ({
  address,
  label,
}: {
  address: string;
  label?: string;
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div
      onClick={() => copyAddress(address, setCopied)}
      className={styles.copyButton}
    >
      {label && <p className={styles.copyLabel}>{label}</p>}
      {address}{" "}
      <Copy size={20} weight="regular" style={{ marginLeft: "8px" }} />
      {copied && (
        <p className={`${label ? styles.copySuccessAlt : styles.copySuccess}`}>
          copied to clipboard ✅
        </p>
      )}
    </div>
  );
};

const Error = () => (
  <div className={styles.modalContent}>
    <h2 className={styles.modalTitle}>Something went wrong 🚨</h2>
    <p className={styles.exampleTitle}>
      Did you enter a valid contract address?
    </p>
    <div className={styles.example}>
      <p className={styles.exampleTitle}>For example:</p>

      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
          label="Dai Stablecoin"
        />
      </div>
    </div>
  </div>
);

const InvalidAddress = () => (
  <div className={styles.modalContent}>
    <h2 className={styles.modalTitle}>Invalid Address 🚨</h2>
    <p className={styles.exampleTitle}>Please enter a valid contract address</p>
    <div className={styles.example}>
      <p className={styles.exampleTitle}>For example:</p>

      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
          label="Dai Stablecoin"
        />
      </div>
    </div>
  </div>
);

const ExampleAddress = () => (
  <div className={styles.modalContent}>
    <h2 className={styles.modalTitle}>Example Addresses 🔥</h2>
    <div className={styles.addressContainer}>
      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0xdAC17F958D2ee523a2206206994597C13D831ec7"
          label="Tether USD"
        />
      </div>
      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
          label="Bored Ape Yaght Club"
        />
      </div>
      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
          label="Uniswap"
        />
      </div>
      <div className={styles.copyContainer}>
        <CopyToClipboard
          address="0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
          label="Aave Token"
        />
      </div>
    </div>
  </div>
);

export const CustomModal = ({
  modal,
  toggleModal,
}: {
  modal: {
    open: boolean;
    type: string;
  };
  toggleModal: ToggleModalType;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p
          className={styles.close}
          data-testid="close-modal"
          onClick={() => toggleModal({ open: false, type: "" })}
        >
          <XCircle size={24} weight="regular" />
        </p>

        {modal.type === "invalidAddress" && <InvalidAddress />}
        {modal.type === "exampleAddress" && <ExampleAddress />}
        {modal.type === "error" && <Error />}
      </div>
    </div>
  );
};
