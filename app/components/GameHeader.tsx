import { View, Text } from "react-native";
import React from "react";
import { Coins } from "lucide-react-native";
import HealthBar from "./HealthBar";
import Clock from "./Clock";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface GameHeaderProps {
  className?: string;
}

const GameHeader = ({ className }: GameHeaderProps) => {
  const coins = useSelector((state: RootState) => state.coins);

  return (
    <View className={`${className} flex-row items-center p-4`}>
      {/* Coins */}
      <View className="flex-row items-center">
        <Coins size={36} color="gold" />
        <Text className="text-white text-2xl ml-2">{coins}</Text>
      </View>

      {/* Health Bar */}
      <View className="flex-1 mx-3">
        <HealthBar />
      </View>

      {/* Clock */}
      <View>
        <Clock />
      </View>
    </View>
  );
};

export default GameHeader;
