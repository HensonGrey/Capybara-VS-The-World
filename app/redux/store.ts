import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coinsSlice";
import temporaryUpgradesReducer from "./slices/temporaryUpgradesSlice";
import clockReducer from "./slices/clockSlice";
import gameSliceReducer from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    temporaryUpgrades: temporaryUpgradesReducer,
    clock: clockReducer,
    game: gameSliceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
