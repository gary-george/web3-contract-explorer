"use client";

import styles from "../styles/page.module.css";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useState } from "react";
import { NotConnected } from "@/components/NotConnected";
import { Connected } from "@/components/Connected";
import { Header } from "@/components/Header";
import { CustomModal } from "@/components/CustomModal";

const Home = () => {
  let { address, isConnected } = useWeb3ModalAccount();
  let { walletProvider } = useWeb3ModalProvider();
  const [modal, toggleModal] = useState({ open: false, type: "" });
  const [lightMode, toggleLightmode] = useState(false);

  return (
    <main className={`${styles.main} ${lightMode ? styles.mainLight : ""}`}>
      <Header lightMode={lightMode} toggleLightmode={toggleLightmode} />
      {modal.open && <CustomModal modal={modal} toggleModal={toggleModal} />}
      {!isConnected && <NotConnected lightMode={lightMode} />}

      {isConnected && (
        <Connected
          isConnected={isConnected}
          address={address}
          walletProvider={walletProvider}
          lightMode={lightMode}
          toggleModal={toggleModal}
        />
      )}
    </main>
  );
};

export default Home;
