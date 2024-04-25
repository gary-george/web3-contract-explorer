import { BrowserProvider, Contract, formatUnits } from "ethers";
import { Eip1193Provider } from "ethers/providers";

import { ABI } from "@/helpers/defaultABI";

type getDataReturnType = {
  userBalance: string;
  totalSupply: string;
  name: string;
  symbol: string;
};

export const getData = async (
  isConnected: boolean,
  address: `0x${string}` | undefined,
  contractAddress: `0x${string}`,
  walletProvider: Eip1193Provider | undefined
): Promise<getDataReturnType> => {
  if (!isConnected || !walletProvider) throw Error("User disconnected");

  const ethersProvider = new BrowserProvider(walletProvider);
  const signer = await ethersProvider.getSigner();
  const contract = new Contract(contractAddress, ABI, signer);
  const userBalance = await contract.balanceOf(address);
  const totalSupply = await contract.totalSupply();
  const symbol = await contract.symbol();
  const name = await contract.name();

  return {
    userBalance: formatUnits(userBalance, 18),
    totalSupply: totalSupply.toString(),
    name,
    symbol,
  };
};
