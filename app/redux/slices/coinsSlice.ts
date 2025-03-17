import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const coinsSlice = createSlice({
  name: "coins",
  initialState: 0,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => state + action.payload,
    removeCoins: (state, action: PayloadAction<number>) =>
      state - action.payload,
    resetCoins: () => 0,
  },
});

export const { addCoins, removeCoins, resetCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
