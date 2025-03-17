import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useGameClock from "../hooks/useGameClock";

const Clock = () => {
  useGameClock(); // Use the hook
  const seconds = useSelector((state: RootState) => state.clock);

  return (
    <View className="items-center">
      <Text className="text-2xl font-bold text-white">
        {formatTime(seconds)}
      </Text>
    </View>
  );
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default Clock;
