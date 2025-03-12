import { Text, TouchableOpacity } from "react-native";
import { LucideIcon } from "lucide-react-native";
import React from "react";

interface UpgradeButtonProps {
  Icon: LucideIcon;
  price: number;
  onPress: () => void;
}

const UpgradeButton = ({ Icon, price, onPress }: UpgradeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex items-center justify-center flex-1 border rounded-lg"
    >
      <Icon size={48} color={"purple"} fill={"gold"} />
      <Text className="text-2xl">{price}</Text>
    </TouchableOpacity>
  );
};

export default UpgradeButton;
