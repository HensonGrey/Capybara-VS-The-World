import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WallProps {
  currentHealth: number;
  maxHealth: number;
}

const initialState: WallProps = {
  currentHealth: 10,
  maxHealth: 10,
};

export const wallSlice = createSlice({
  name: "wall",
  initialState: initialState,
  reducers: {
    addHealth: (state) => {
      state.currentHealth++;
      state.maxHealth++;
    },
    removeHealth: (state) => {
      state.currentHealth--;
    },
    destroyWall: (state) => {
      state.currentHealth = 0;
    },
  },
});

export const { addHealth, removeHealth, destroyWall } = wallSlice.actions;

export default wallSlice.reducer;
