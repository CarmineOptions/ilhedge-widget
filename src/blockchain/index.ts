import { AccountInterface, Contract, Provider, constants } from "starknet";
import ABI from "./abi.json";
import { store } from "../redux/store";
import { baseFromConvertedSize } from "../utils";

const IL_HEDGE_ADDRESS =
  "0x008ac98d0bd56da03edc9224cad552c22e4db78500d40980e64fbe65d5fb6321";

const TestnetProvider = new Provider({
  sequencer: {
    network: constants.NetworkName.SN_GOERLI,
  },
});

export const balanceOf = async (
  account: AccountInterface,
  tokenAddress: string
): Promise<bigint | undefined> => {
  const contract = new Contract(ABI, tokenAddress, account);
  const res = await contract.balanceOf(account.address);
  if (res && res.balance) {
    return res?.balance?.low;
  }
  return undefined;
};

export type HedgePrice = [bigint, bigint];

export const getHedgePrice = async (): Promise<HedgePrice | undefined> => {
  const { state } = store.getState();
  const pair = state.tokenPair;

  if (pair === undefined) {
    // unreachable, but TypeScript really likes this
    return;
  }

  const calldata = [
    baseFromConvertedSize(state.notionalValue, pair.base.decimals),
    pair.quote.address,
    pair.base.address,
    1693526399, // option expiry
  ];

  const contract = new Contract(ABI, IL_HEDGE_ADDRESS, TestnetProvider);
  const res: HedgePrice | undefined = await contract
    .price_hedge(...calldata)
    .catch((e: unknown) => {
      console.log("Failed getting hedge price", e);
      return undefined;
    });

  console.log("price response:", res);

  return res;
};

export const hedge = async () => {
  const { state, balance } = store.getState();
  const pair = state.tokenPair;
  const price = balance.price;
  const account = state.account;

  if (
    pair === undefined ||
    account === undefined ||
    price.amountBase === undefined ||
    price.amountQuote === undefined
  ) {
    // unreachable, but TypeScript really likes this
    return;
  }

  const priceWithSlippage = (n: bigint): string => {
    const slippage = n / BigInt(20); // 1/20 is 5%
    const withSlippage = n + slippage;
    return withSlippage.toString(10);
  };

  const baseApproveArgs = {
    contractAddress: pair.base.address,
    entrypoint: "approve",
    calldata: [IL_HEDGE_ADDRESS, priceWithSlippage(price.amountBase), "0"],
  };

  const quoteApproveArgs = {
    contractAddress: pair.quote.address,
    entrypoint: "approve",
    calldata: [IL_HEDGE_ADDRESS, priceWithSlippage(price.amountQuote), "0"],
  };

  const hedgeArgs = {
    contractAddress: IL_HEDGE_ADDRESS,
    entrypoint: "hedge",
    calldata: [
      baseFromConvertedSize(state.notionalValue, pair.base.decimals).toString(
        10
      ),
      pair.quote.address,
      pair.base.address,
      1693526399, // option expiry
    ],
  };

  const transactions = [];

  if (price.amountBase > 0) {
    transactions.push(baseApproveArgs);
  }
  if (price.amountQuote > 0) {
    transactions.push(quoteApproveArgs);
  }
  transactions.push(hedgeArgs);

  const res = await account.execute(transactions, [ABI, ABI]);

  return res;
};
