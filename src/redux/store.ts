import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { balance } from "./reducers/balance";
import { state } from "./reducers/state";
import logger from "redux-logger";
import { ui } from "./reducers/ui";

const reducer = combineReducers({
  balance: balance.reducer,
  state: state.reducer,
  ui: ui.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
