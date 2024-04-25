import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../src/app/page";

jest.mock("@web3modal/ethers/react", () => ({
  useWeb3ModalProvider: () => ({
    walletProvider: () => null,
  }),
  useWeb3ModalAccount: () => ({
    address: "0x1245",
    isConnected: true,
    provider: null,
    signer: null,
  }),
}));

describe("User Connected", () => {
  it("renders the UI for a connected user", async () => {
    const { getByText, getAllByTestId } = render(<Home />);

    const Title = screen.getAllByText(/Ethereum Contract Explorer/i);
    expect(Title[0]).toBeInTheDocument();

    const ViewExamplesButton = getByText("view example addresses");
    await act(async () => {
      fireEvent.click(ViewExamplesButton);
    });

    const ModalTitle = screen.getAllByText(/Example Addresses 🔥/i);
    expect(ModalTitle[0]).toBeInTheDocument();

    const CloseBtn = getAllByTestId("close-modal");
    await act(async () => {
      fireEvent.click(CloseBtn[0]);
    });

    const GetDataButton = getByText("Get Data");
    await act(async () => {
      fireEvent.click(GetDataButton);
    });

    const ModalErrorTitle = screen.getAllByText(
      /Please enter a valid contract address/i
    );
    expect(ModalErrorTitle[0]).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(CloseBtn[0]);
    });
  });
});
