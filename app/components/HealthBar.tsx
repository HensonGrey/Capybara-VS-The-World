import React from "react";
import { View, Text } from "react-native";

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  className?: string;
}

const HealthBar = ({ currentHealth, maxHealth, className }: HealthBarProps) => {
  const healthPercentage = Math.max((currentHealth / maxHealth) * 100, 0);

  return (
    <View className={`w-full h-8 bg-gray-700 rounded-lg border ${className}`}>
      <View
        className="h-full bg-red-500 rounded-lg"
        style={{ width: `${healthPercentage}%` }}
      />
      <Text className="absolute w-full text-center text-white text-lg font-bold">
        {currentHealth} / {maxHealth}
      </Text>
    </View>
  );
};

export default HealthBar;
