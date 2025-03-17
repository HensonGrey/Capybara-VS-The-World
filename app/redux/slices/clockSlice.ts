import { createSlice } from "@reduxjs/toolkit";

export const clockSlice = createSlice({
  name: "clock",
  initialState: 0, // seconds
  reducers: {
    increaseTime: (state) => {
      return state + 1;
    },
    resetTime: () => 0,
  },
});

export const { increaseTime, resetTime } = clockSlice.actions;
export default clockSlice.reducer;
