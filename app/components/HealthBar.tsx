import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface HealthBarProps {
  className?: string;
}

const HealthBar = ({ className }: HealthBarProps) => {
  const currentWallHealth = useSelector(
    (state: RootState) => state.temporaryUpgrades.currentWallHealth
  );
  const maximumWallHealth = useSelector(
    (state: RootState) => state.temporaryUpgrades.maximumWallHealth
  );
  const healthPercentage = Math.max(
    (currentWallHealth / maximumWallHealth) * 100,
    0
  );

  return (
    <View className={`w-full h-8 bg-gray-700 rounded-lg border ${className}`}>
      <View
        className="h-full bg-red-500 rounded-lg"
        style={{ width: `${healthPercentage}%` }}
      />
      <Text className="absolute w-full text-center text-white text-lg font-bold">
        {currentWallHealth} / {maximumWallHealth}
      </Text>
    </View>
  );
};

export default HealthBar;
