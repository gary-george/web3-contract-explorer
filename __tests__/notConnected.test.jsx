import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

jest.mock("@web3modal/ethers/react", () => ({
  useWeb3ModalProvider: () => ({
    walletProvider: () => null,
  }),
  useWeb3ModalAccount: () => ({
    address: "0x1245",
    isConnected: false,
    provider: null,
    signer: null,
  }),
}));

describe("User Not Connected", () => {
  it("renders the expected title", () => {
    render(<Home />);

    const Title = screen.getAllByText(
      /Please connect your wallet to get started!/i
    );
    expect(Title[0]).toBeInTheDocument();
  });
});
