import { configureStore } from "@reduxjs/toolkit";
import { coinsSlice } from "./slices/coinsSlice";
import { wallSlice } from "./slices/wallSlice";

export const store = configureStore({
  reducer: {
    coins: coinsSlice.reducer,
    wall: wallSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
