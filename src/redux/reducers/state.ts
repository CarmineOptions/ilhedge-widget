import { createSlice } from "@reduxjs/toolkit";
import { AccountInterface } from "starknet";
import { TokenPair } from "../../constants";

export interface State {
  account?: AccountInterface;
  tokenPair?: TokenPair;
  notionalValue: number;
  getNewQuote: boolean;
}

export const state = createSlice({
  name: "state",
  initialState: {
    notionalValue: 0,
    getNewQuote: true,
  } as State,
  reducers: {
    setNotionalValueReducer: (state, action: { payload: number }) => {
      state.notionalValue = action.payload;
      state.getNewQuote = true;
      return state;
    },
    setTokenPairReducer: (
      state,
      action: { payload: TokenPair | undefined }
    ) => {
      state.tokenPair = action.payload;
      return state;
    },
    setAccountReducer: (
      state,
      action: { payload: AccountInterface | undefined }
    ) => {
      state.account = action.payload;
      return state;
    },
    setGetNewQuoteReducer: (state, action: { payload: boolean }) => {
      state.getNewQuote = action.payload;
      return state;
    },
  },
});

export const {
  setNotionalValueReducer,
  setTokenPairReducer,
  setAccountReducer,
  setGetNewQuoteReducer,
} = state.actions;
