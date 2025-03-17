import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: false,
  reducers: {
    toggleGameState: (state) => !state,
  },
});

export const { toggleGameState } = gameSlice.actions;
export default gameSlice.reducer;
