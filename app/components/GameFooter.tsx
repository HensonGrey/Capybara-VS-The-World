import { View, Text } from "react-native";
import React from "react";
import UpgradeButton from "./UpgradeButton";
import { Heart, Plus, Swords } from "lucide-react-native";

interface GameFooterProps {
  className: string;
}

const GameFooter = ({ className }: GameFooterProps) => {
  return (
    <View className={`${className} flex-row`} style={{ flex: 1 }}>
      <UpgradeButton
        Icon={Plus}
        price={0}
        onPress={() => console.log("clicked add new player")}
      />
      <UpgradeButton
        Icon={Swords}
        price={0}
        onPress={() => console.log("clicked increase dmg")}
      />
      <UpgradeButton
        Icon={Heart}
        price={0}
        onPress={() => console.log("clicked increase hp")}
      />
    </View>
  );
};

export default GameFooter;
