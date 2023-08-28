import { createSlice } from "@reduxjs/toolkit";

export interface Ui {
  modalOpen: boolean;
  tokenSelectModalOpen: boolean;
}

export const ui = createSlice({
  name: "ui",
  initialState: {
    modalOpen: false,
  } as Ui,
  reducers: {
    setModalOpenReducer: (state, action: { payload: boolean }) => {
      state.modalOpen = action.payload;
      return state;
    },
    setTokenSelectModalOpenReducer: (state, action: { payload: boolean }) => {
      state.tokenSelectModalOpen = action.payload;
      return state;
    },
  },
});

export const { setModalOpenReducer, setTokenSelectModalOpenReducer } =
  ui.actions;
