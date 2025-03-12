import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Coins, EllipsisVertical } from "lucide-react-native";
import HealthBar from "./HealthBar";
import Clock from "./Clock";

interface GameHeaderProps {
  className?: string;
}

const GameHeader = ({ className }: GameHeaderProps) => {
  return (
    <View className={`${className} flex-row items-center p-4`}>
      {/* Menu Button */}
      <View className="w-12 items-start">
        <TouchableOpacity className="-ml-1">
          <EllipsisVertical size={36} color="black" />
        </TouchableOpacity>
      </View>

      {/* Space to create separation */}
      <View className="w-4" />

      {/* Coins */}
      <View className="flex-row items-center">
        <Coins size={36} color="gold" />
        <Text className="text-white text-2xl ml-2">0</Text>
      </View>

      {/* Health Bar - Give it as much space as possible */}
      <View className="flex-1 mx-3">
        <HealthBar currentHealth={70} maxHealth={100} />
      </View>

      {/* Clock */}
      <View>
        <Clock />
      </View>
    </View>
  );
};

export default GameHeader;
