import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//would be incrementing these with every button click and add that value in the systems
interface GameStats {
  bulletDamage: number;
  playerCount: number;
  currentWallHealth: number;
  maximumWallHealth: number;
}

const initialState: GameStats = {
  bulletDamage: 1,
  playerCount: 1,
  currentWallHealth: 3,
  maximumWallHealth: 3,
};

const temporaryUpgradesSlice = createSlice({
  name: "temporaryUpgrades",
  initialState,
  reducers: {
    increaseBulletDamage: (state) => {
      state.bulletDamage++;
    },
    increasePlayerCount: (state) => {
      state.playerCount++;
    },
    increaseWallHealth: (state) => {
      state.currentWallHealth += 2;
      state.maximumWallHealth += 2;
    },
    lowerWallHealth: (state, action: PayloadAction<number>) => {
      state.currentWallHealth -= action.payload;
    },
    resetGame: (state) => {
      state.bulletDamage = 1;
      state.currentWallHealth = 3;
      state.maximumWallHealth = 3;
      state.playerCount = 1;
    },
  },
});

export const {
  increaseBulletDamage,
  increasePlayerCount,
  increaseWallHealth,
  lowerWallHealth,
  resetGame,
} = temporaryUpgradesSlice.actions;
export default temporaryUpgradesSlice.reducer;
