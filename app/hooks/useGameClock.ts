// hooks/useGameClock.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { increaseTime } from "../redux/slices/clockSlice";

// Global reference to prevent multiple intervals
let globalIntervalId: NodeJS.Timeout | null = null;

const useGameClock = () => {
  const dispatch = useDispatch();
  const gameIsRunning = useSelector((state: RootState) => state.game);

  useEffect(() => {
    // Clear any existing interval first
    if (globalIntervalId) {
      clearInterval(globalIntervalId);
      globalIntervalId = null;
    }

    if (gameIsRunning) {
      globalIntervalId = setInterval(() => {
        dispatch(increaseTime());
      }, 1000);
    }

    return () => {
      if (globalIntervalId) {
        clearInterval(globalIntervalId);
        globalIntervalId = null;
      }
    };
  }, [gameIsRunning, dispatch]);
};

export default useGameClock;
