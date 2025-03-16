import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface HealthBarProps {
  className?: string;
}

const HealthBar = ({ className }: HealthBarProps) => {
  const wallHealth = useSelector((state: RootState) => state.wall);
  const healthPercentage = Math.max(
    (wallHealth.currentHealth / wallHealth.maxHealth) * 100,
    0
  );

  return (
    <View className={`w-full h-8 bg-gray-700 rounded-lg border ${className}`}>
      <View
        className="h-full bg-red-500 rounded-lg"
        style={{ width: `${healthPercentage}%` }}
      />
      <Text className="absolute w-full text-center text-white text-lg font-bold">
        {wallHealth.currentHealth} / {wallHealth.maxHealth}
      </Text>
    </View>
  );
};

export default HealthBar;
