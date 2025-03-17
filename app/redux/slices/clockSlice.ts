import { createSlice } from "@reduxjs/toolkit";

export const clockSlice = createSlice({
  name: "clock",
  initialState: 0, // seconds
  reducers: {
    increaseTime: (state) => {
      state++;
    },
    resetTime: (state) => {
      state = 0;
    },
  },
});

export const { increaseTime, resetTime } = clockSlice.actions;
export default clockSlice.reducer;
