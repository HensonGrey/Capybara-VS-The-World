import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "record",
  initialState: 0,
  reducers: {
    setRecord: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const { setRecord } = timeSlice.actions;
export default timeSlice.reducer;
