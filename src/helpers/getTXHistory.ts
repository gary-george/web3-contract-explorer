import { EtherscanProvider } from "ethers";
import { BlockTag, Networkish } from "ethers/providers";

export class MyEtherscanProvider extends EtherscanProvider {
  constructor(networkish?: Networkish, apiKey?: string) {
    super(networkish, apiKey);
  }

  async getHistory(
    address: string,
    startBlock?: BlockTag,
    endBlock?: BlockTag
  ): Promise<Array<any>> {
    const params = {
      action: "txlist",
      address,
      startblock: startBlock == null ? 0 : startBlock,
      endblock: endBlock == null ? 99999999 : endBlock,
      sort: "desc",
    };

    return this.fetch("account", params);
  }
}
