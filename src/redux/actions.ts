import { AccountInterface } from "starknet";
import { TokenPair } from "../constants";
import { Balance, setBalanceReducer } from "./reducers/balance";
import {
  setAccountReducer,
  setGetNewQuoteReducer,
  setNotionalValueReducer,
  setTokenPairReducer,
} from "./reducers/state";
import { store } from "./store";
import { HedgePrice, balanceOf, getHedgePrice } from "../blockchain";
import {
  setModalOpenReducer,
  setTokenSelectModalOpenReducer,
} from "./reducers/ui";
import { connect } from "get-starknet";

const setBalance = (v: Partial<Balance>) =>
  store.dispatch(setBalanceReducer(v));

const setModalOpen = (open: boolean) =>
  store.dispatch(setModalOpenReducer(open));

const setTokenSelectModalOpen = (open: boolean) =>
  store.dispatch(setTokenSelectModalOpenReducer(open));

const setGetNewQuote = (v: boolean) => store.dispatch(setGetNewQuoteReducer(v));

export const openModal = () => setModalOpen(true);

export const closeModal = () => setModalOpen(false);

export const openTokenSelectModal = () => setTokenSelectModalOpen(true);

export const closeTokenSelectModal = () => setTokenSelectModalOpen(false);

export const shouldGetNewQuote = () => setGetNewQuote(true);

export const gotNewQuote = () => setGetNewQuote(false);

export const setAccount = (a?: AccountInterface) =>
  store.dispatch(setAccountReducer(a));

export const setTokenPair = (t?: TokenPair) =>
  store.dispatch(setTokenPairReducer(t));

export const setNotionalValue = (n: number) =>
  store.dispatch(setNotionalValueReducer(n));

export const setFetchingBalance = () =>
  setBalance({
    base: {
      fetching: true,
      amount: undefined,
    },
    quote: {
      fetching: true,
      amount: undefined,
    },
  });

export const setFetchedBalance = (
  t: "base" | "quote",
  n: bigint | undefined
) => {
  const v =
    t === "base"
      ? {
          base: {
            fetching: false,
            amount: n,
          },
        }
      : {
          quote: {
            fetching: false,
            amount: n,
          },
        };
  setBalance(v);
};

export const setFetchingPrice = () =>
  setBalance({
    price: {
      fetching: true,
      amountBase: undefined,
      amountQuote: undefined,
      error: undefined,
    },
  });

export const setFetchedPrice = (prices: HedgePrice) => {
  setBalance({
    price: {
      fetching: false,
      amountBase: prices[1],
      amountQuote: prices[0],
      error: undefined,
    },
  });
};

export const setFetchedPriceError = () => {
  setBalance({
    price: {
      fetching: false,
      amountBase: undefined,
      amountQuote: undefined,
      error: "failed",
    },
  });
};

export const fetchUserBalance = (
  account: AccountInterface,
  tokenPair: TokenPair
) => {
  setFetchingBalance();
  balanceOf(account, tokenPair.base.address).then((r) =>
    setFetchedBalance("base", r)
  );
  balanceOf(account, tokenPair.quote.address).then((r) =>
    setFetchedBalance("quote", r)
  );
};

export const fetchPrice = () => {
  gotNewQuote();
  setFetchingPrice();
  getHedgePrice()
    .then((res) => {
      if (res) {
        setFetchedPrice(res);
      } else {
        setFetchedPriceError();
      }
    })
    .catch((e) => console.log("Failed getting quote", e));
};

export const connectWallet = async () => {
  const res = await connect({ modalMode: "alwaysAsk" });
  const { balance, state } = store.getState();

  if (res && res.account) {
    setAccount(res.account);
    if (
      !balance.base.amount &&
      !balance.base.fetching &&
      !balance.quote.amount &&
      !balance.quote.fetching &&
      state.tokenPair
    ) {
      // pair is already set, balance has not been yet fetched
      // and user has now connected wallt -> fetch balance
      fetchUserBalance(res.account, state.tokenPair);
    }
  }
};
