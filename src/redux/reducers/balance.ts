import { createSlice } from "@reduxjs/toolkit";

type TokenBalance = {
  fetching: boolean;
  amount: bigint | undefined;
};

type Price = {
  fetching: boolean;
  amountBase: bigint | undefined;
  amountQuote: bigint | undefined;
  error: string | undefined;
};

export interface Balance {
  base: TokenBalance;
  quote: TokenBalance;
  price: Price;
}

export const balance = createSlice({
  name: "balance",
  initialState: {
    base: {
      fetching: false,
      amount: undefined,
    },
    quote: {
      fetching: false,
      amount: undefined,
    },
    price: {
      fetching: false,
      amountBase: undefined,
      amountQuote: undefined,
      error: undefined,
    },
  } as Balance,
  reducers: {
    setBalanceReducer: (state, action: { payload: Partial<Balance> }) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

export const { setBalanceReducer } = balance.actions;
