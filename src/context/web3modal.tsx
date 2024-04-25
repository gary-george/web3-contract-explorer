"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = "b0c2e15593ff6cb3b507ee9c651fe423";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost",
  icons: ["https://avatars.mywebsite.com/"],
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "...",
  defaultChainId: 1,
});

createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children;
}
