import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coinsSlice";
import temporaryUpgradesReducer from "./slices/temporaryUpgradesSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    temporaryUpgrades: temporaryUpgradesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
